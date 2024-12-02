import * as uploadService from '../services/spaces.service.js';

export const upload = async (req, res) => {
  try {
    await uploadService.uploadFile(req.file, req.id);

    return res.status(200).json({
      message: "OK!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500);
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

    const result = await uploadService.deleteFile(document_id);

    if (result) {
      return res.status(200).json({
        success: true,
        message: "File deleted successfully"
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
