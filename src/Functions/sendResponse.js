function sendResponse(res, err, data){
  if (err){
    res.status = 404;
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.status = 204;
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.status = 200;
    res.json({
      success: true,
      data: data
    })
  }
};

module.exports.sendResponse = sendResponse;