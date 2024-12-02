import * as notificationService from '../services/notification.service.js';

export const getNotify = async (req, res) => {
  try {
    const result = await notificationService.getNotify(req.id)
    return res.status(200).json(result)
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
}

export const viewNotify = async (req, res) => {
  try {
    const result = await notificationService.viewNotify(req.body.id, req.id)
    if (result) {
      return res.status(200).json({
        message: "OK!"
      });
    } else {
      return res.status(403).json({
        message: "Forbidden!"
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500)
  }
}

export const viewAll = async (req, res) => {
  try {
    await notificationService.viewAll(req.id)
    return res.status(200).json({
      message: "OK!"
    })
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
}

export const deleteNotify = async (req, res) => {
  try {
    const result = await notificationService.deleteNotify(req.body.id, req.id)
    if (result) {
      return res.status(200).json({
        message: "OK!"
      })
    } else {
      return res.status(403).json({
        message: "Forbidden!"
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500)
  }
}

export const deleteAll = async (req, res) => {
  try {
    await notificationService.deleteAll(req.id);
  } catch (error) {
    console.error(error);
    return res.status(500)
  }
}
