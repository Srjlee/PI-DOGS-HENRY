import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog } from "../redux/actions/actions";
import "./DogCreate.css";
import { useNavigate } from "react-router-dom";

export default function DogCreate() {
  const store = useSelector((state) => state);
  const [errors, setErrors] = useState({});
  const dogInitial = {
    name: "",
    image: "",
    heightMin: "0",
    heightMax: "0",
    weightMin: "0",
    weightMax: "0",
    life_spanMin: "0",
    life_spanMax: "0",
    temperament: [],
    btn: {
      class: "inactivo",
      disabled: true,
    },
  };
  const [dog, setDog] = useState(dogInitial);
  const [submit, setsubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (dog.name && !errors.flag) {
      setsubmit(true);
    } else {
      setsubmit(false);
    }
  }, [errors, dog, submit]);

  const imageValidate = (URL) => {
    const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/);
    if (regex.test(URL)) return URL;
    if (!regex.test(URL))
      return "https://i.pinimg.com/564x/9b/92/b4/9b92b4f32a1c318c406796016bc9bd1c.jpg";
  };

  const validate = (dog) => {
    let errors = {};
    if (!dog.name) {
      errors.name = "Name is required";
    }
    if (dog.name) {
      if (
        dog.heightMin == 0 ||
        dog.heightMax == 0 ||
        dog.weightMin == 0 ||
        dog.weightMax == 0
      )
        errors.flag = true;
    }
    //if(!dog.image) errors.image = 'Image is required'
    if (dog.heightMin !== 0) {
      if (!dog.heightMin || isNaN(dog.heightMin) || dog.heightMin < 0)
        errors.heightMin = "Must be a number and not be null";
    }
    if (dog.heightMax !== 0) {
      if (
        !dog.heightMax ||
        isNaN(dog.heightMax) ||
        +dog.heightMax < +dog.heightMin ||
        dog.heightMax < 0
      )
        errors.heightMax = "HeightMax must be greater than HeightMin";
    }
    if (dog.weightMin !== 0) {
      if (dog.weightMin < 0 || !dog.weightMin || isNaN(dog.weightMin))
        errors.weightMin = "Must be a number and not be null";
    }
    if (dog.weightMax !== 0) {
      if (
        !dog.weightMax ||
        dog.weightMax < 0 ||
        isNaN(dog.weightMax) ||
        +dog.weightMax < +dog.weightMin
      )
        errors.weightMax = "WeightMax must be greater than WeightMin";
    }
    if (dog.life_spanMin !== 0) {
      if (!dog.life_spanMin || isNaN(dog.life_spanMin) || dog.life_spanMin < 0)
        errors.life_spanMin = "must be a number and not be null";
    }
    if (dog.life_spanMin !== "") {
      if (+dog.life_spanMax < +dog.life_spanMin || dog.life_spanMax < 0)
        errors.life_spanMax =
          "LifeSpanMax must be greater than LifeSpanMin and not be null";
    }

    return errors;
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    let item = e.target.name;
    if (item === "temperamento") {
      let temper = store.temps.find((t) => t.id == e.target.value);
      if (!dog.temperament.includes(temper))
        setDog({ ...dog, temperament: [...dog.temperament, temper] });
    } else {
      setErrors(validate({ ...dog, [e.target.name]: e.target.value }));
      setDog({ ...dog, [e.target.name]: e.target.value });
    }
  };
  const quitar = (e) => {
    e.preventDefault();
    setDog({
      ...dog,
      temperament: dog.temperament.filter(
        (d) => parseInt(d.id) !== parseInt(e.target.value)
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDog(dog));
    setDog(dogInitial);
    navigate("/msj");
  };
  return (
    <div className="create">
      <div className="titulo">
        <h2>Create your Breed</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="datos-medidas">
            <div className="datos">
              <div className="dato">
                <label htmlFor="name">Name: </label> <br />
                <input
                  type="text"
                  name="name"
                  value={dog.name}
                  onChange={handleInputChange}
                  placeholder="Name of New Breed"
                />
                {errors.name === "" ? null : <p>{errors.name}</p>}
              </div>
              <div className="dato">
                <label htmlFor="image">Image: </label> <br />
                <input
                  type="text"
                  name="image"
                  value={dog.image}
                  onChange={handleInputChange}
                  placeholder="Insert img by URL"
                />
                {errors.image === "" ? null : <p>{errors.image}</p>}
              </div>
            </div>
            <div className="medidas">
              <div className="medida">
                <label htmlFor="height">Height: </label>
                <div className="min-maxWraper" name="height">
                  <div className="min">
                    <input
                      type="number"
                      name="heightMin"
                      value={dog.heightMin}
                      onChange={handleInputChange}
                      placeholder="Minimum"
                    />
                    {errors.heightMin === "" ? null : (
                      <p>{errors.heightMin} </p>
                    )}
                  </div>
                  <div className="max">
                    <input
                      type="number"
                      name="heightMax"
                      value={dog.heightMax}
                      onChange={handleInputChange}
                      placeholder="Maximun"
                    />
                    {errors.heightMax === "" ? null : <p>{errors.heightMax}</p>}
                  </div>
                </div>
              </div>
              <div className="medida">
                <label htmlFor="weight">Weight: </label>
                <div className="min-maxWraper" name="weight">
                  <div className="min">
                    <input
                      type="text"
                      name="weightMin"
                      value={dog.weightMin}
                      onChange={handleInputChange}
                      placeholder="Minimum"
                    />
                    {errors.weightMin === "" ? null : <p>{errors.weightMin}</p>}
                  </div>
                  <div className="max">
                    <input
                      type="text"
                      name="weightMax"
                      value={dog.weightMax}
                      onChange={handleInputChange}
                      placeholder="Maximun"
                    />
                    {errors.weightMax === "" ? null : <p>{errors.weightMax}</p>}
                  </div>
                </div>
              </div>
              <div className="medida">
                <label htmlFor="life_span">Life Span: </label>
                <div className="min-maxWraper">
                  <div className="min">
                    <input
                      type="text"
                      name="life_spanMin"
                      value={dog.life_spanMin}
                      onChange={handleInputChange}
                      placeholder="Minimun Life Span"
                    />
                    {errors.life_spanMin === "" ? null : (
                      <p>{errors.life_spanMin}</p>
                    )}
                  </div>
                  <div className="max">
                    <input
                      type="text"
                      name="life_spanMax"
                      value={dog.life_spanMax}
                      onChange={handleInputChange}
                      placeholder="Maximun Life Span"
                    />
                    {errors.life_spanMax === "" ? null : (
                      <p>{errors.life_spanMax}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="temperamentos">
            <div className="selector">
              <select
                multiple
                name="temperamento"
                onChange={handleInputChange}
                className=""
              >
                {store.temps.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mapeo">
              {dog.temperament.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={quitar}
                  value={btn.id}
                  className="onClose"
                >
                  {btn.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="botones">
          <button
            type="submit"
            disabled={!submit}
            className={submit ? "activo" : "inactivo"}
          >
            Create Breed
          </button>

          <button onClick={() => navigate("/dogs")} className="activo">
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
