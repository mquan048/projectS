import * as uploadService from '../services/spaces.service.js';


export const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const result = await uploadService.uploadFile(req.file, req.id);

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: result
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(error.message === 'File size exceeds limit' ||
      error.message === 'File type not allowed'
      ? 400 : 500).json({
        success: false,
        message: error.message || "Internal server error"
      });
  }
}


export const remove = async (req, res) => {
  try {
    const document_id = req.params.document_id;

    if (!document_id) {
      return res.status(400).json({
        success: false,
        message: "Document ID is required"
      });
    }

    await uploadService.deleteFile(document_id);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully"
    });
  } catch (error) {
    console.error('Delete error:', error);
    if (error.message === 'File not found') {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}


export const getFileUrl = async (req, res) => {
  try {
    const { document_id } = req.params;

    if (!document_id) {
      return res.status(400).json({
        success: false,
        message: "Document ID is required"
      });
    }

    const signedUrl = await uploadService.getFileUrl(document_id, req.id);

    return res.status(200).json({
      success: true,
      url: signedUrl
    });
  } catch (error) {
    console.error('Get URL error:', error);
    if (error.message === 'File not found or unauthorized') {
      return res.status(404).json({
        success: false,
        message: "File not found or unauthorized"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}


export const getUserFiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await uploadService.listUserFiles(req.id, { page, limit });

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('List files error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}


export const triggerCleanup = async (req, res) => {
  try {
    await uploadService.cleanupOldFiles();
    return res.status(200).json({
      success: true,
      message: "Cleanup completed successfully"
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
