import React, { useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Upload as UploadIcon, FileText, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Loader } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { toast } from 'react-hot-toast';

export function Upload() {
  const { profile, canUpload } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidFileType(droppedFile)) {
        setFile(droppedFile);
        setTitle(droppedFile.name.replace(/\.[^/.]+$/, ''));
      } else {
        toast.error('Please upload a PDF, DOCX, or TXT file');
      }
    }
  }, []);

  const isValidFileType = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    return validTypes.includes(file.type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile);
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
    } else if (selectedFile) {
      toast.error('Please upload a PDF, DOCX, or TXT file');
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `documents/${profile?.id}/${fileName}`;

    const { error } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (error) throw error;
    return filePath;
  };

  const analyzeDocument = async (documentId: string, content: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          document_id: documentId,
          content
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canUpload()) {
      toast.error('Upload limit reached. Please upgrade your plan.');
      return;
    }

    if (!file && !textContent.trim()) {
      toast.error('Please upload a file or enter text content');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a document title');
      return;
    }

    setUploading(true);

    try {
      let filePath = '';
      let fileSize = 0;
      let fileType = 'text/plain';
      
      if (file) {
        filePath = await uploadFile(file);
        fileSize = file.size;
        fileType = file.type;
      }

      // Create document record
      const { data: document, error: docError } = await supabase
        .from('documents')
        .insert({
          user_id: profile!.id,
          title: title.trim(),
          file_path: filePath || `text/${Date.now()}.txt`,
          file_type: fileType,
          file_size: fileSize || textContent.length,
        })
        .select()
        .single();

      if (docError) throw docError;

      // Update monthly upload count
      if (profile?.subscription_plan === 'free') {
        await supabase
          .from('user_profiles')
          .update({ monthly_uploads: (profile.monthly_uploads || 0) + 1 })
          .eq('id', profile.id);
      }

      // Log usage
      await supabase
        .from('usage_logs')
        .insert({
          user_id: profile!.id,
          action: 'document_upload',
          document_id: document.id,
        });

      // Start analysis
      const content = file ? await file.text() : textContent;
      await analyzeDocument(document.id, content);

      toast.success('Document uploaded and analysis started!');
      
      // Reset form
      setFile(null);
      setTextContent('');
      setTitle('');
      
      // Redirect to document view
      window.location.href = `/documents/${document.id}`;
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (!canUpload()) {
    return (
      <div className="p-8">
        <Card className="max-w-2xl mx-auto border-orange-200 bg-orange-50">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-orange-800 mb-2">
              Upload Limit Reached
            </h2>
            <p className="text-orange-700 mb-6">
              You've used all {profile?.subscription_plan === 'free' ? '3' : 'available'} uploads 
              this month. Upgrade to Pro for unlimited uploads and advanced features.
            </p>
            <Button>Upgrade Plan</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Contract for Analysis
          </h1>
          <p className="text-gray-600">
            Upload a PDF, DOCX, or TXT file, or paste your contract text below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title for your document"
            required
          />

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Method
            </label>
            
            {/* File Upload */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : file
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {file ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-green-800 font-medium">{file.name}</span>
                </div>
              ) : (
                <>
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {dragActive ? 'Drop your file here' : 'Drag & drop your contract'}
                  </p>
                  <p className="text-gray-500 mb-4">
                    or click to browse files
                  </p>
                  <p className="text-sm text-gray-400">
                    Supports PDF, DOCX, and TXT files up to 10MB
                  </p>
                </>
              )}
            </div>

            {/* Text Input Alternative */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div>
              <label htmlFor="textContent" className="block text-sm font-medium text-gray-700 mb-1">
                Paste Contract Text
              </label>
              <textarea
                id="textContent"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste your contract text here..."
                rows={10}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Important Notice</p>
                <p>
                  Our AI analysis provides general insights and should not be considered 
                  legal advice. For important contracts or legal matters, please consult 
                  with a qualified attorney.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {profile?.subscription_plan === 'free' && (
                <span>
                  {3 - (profile?.monthly_uploads || 0)} free uploads remaining this month
                </span>
              )}
            </div>
            
            <Button 
              type="submit" 
              loading={uploading}
              disabled={(!file && !textContent.trim()) || !title.trim()}
              className="px-8"
            >
              {uploading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Upload & Analyze
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}