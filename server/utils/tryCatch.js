export default function tryCatch(fun = () => {}) {
  return (req, res, next) => {
    try {
      fun(req, res, next);
    } catch (error) {
      console.error("From", fun.name, "error :", error);
      res
        .status(500)
        .json({ message: "Failed to Request", error: error.message });
    }
  };
}
