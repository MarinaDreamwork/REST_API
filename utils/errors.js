const errorServer = (res) => {
  res.status(500).send('На сервере произошла ошибка. Попробуйте позднее.')
};

const errorUnAuthorized = (res) => {
  res.status(400).send({
    error: {
      message: 'Unauthorized',
      code: 400
    }
  })
};

const errorEmailExist = (res) => {
  res.status(400).json({
    error: {
      message: 'EMAIL_EXISTS',
      code: 400
    }
  });
};

const errorNickNameExist = (res) => {
  res.status(400).json({
    error: {
      message: 'NICKNAME_EXISTS',
      code: 400
    }
  });
};

module.exports = {
  errorServer,
  errorUnAuthorized,
  errorEmailExist,
  errorNickNameExist
};