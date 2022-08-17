module.exports = {
  validarPeso: (peso) => {
    let [min, max] = peso.split("-");
    min = isNaN(min) ? "0" : parseInt(min);
    max = isNaN(max) ? "0" : parseInt(max);
    return [min, max];
  },
  imageValidate: (URL) => {
    const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/);
    if (regex.test(URL)) return URL;
    if (!regex.test(URL))
      return "https://i.pinimg.com/564x/9b/92/b4/9b92b4f32a1c318c406796016bc9bd1c.jpg";
  },
};
