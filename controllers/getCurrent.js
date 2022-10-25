const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  await res.status(200).json({
    email,
    subscription,
  });
};

module.exports = getCurrent;
