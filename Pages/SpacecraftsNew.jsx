import { useState } from "react";
import styles from "./SpacecraftsNew.module.css";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

const INITIAL_DATA = {
  name: "",
  capacity: "",
  description: "",
};

const FORM_FIELDS = [
  { label: "Spacecraft Name", name: "name", type: "text" },
  { label: "Hull Capacity", name: "capacity", type: "number" },
  { label: "Description", name: "description", type: "textarea" },
];
function SpacecraftsNew() {
  const [formData, setFormData] = useState(INITIAL_DATA);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newFormErrors = {};
    if (!formData.name.trim()) {
      newFormErrors.name = "Name is required.";
    }

    if (Object.keys(newFormErrors).length > 0) {
      setErrors(newFormErrors);
      return;
    }

    try {
      setErrors({});
      await SpaceTravelApi.buildSpacecraft({
        name: formData.name,
        capacity: Number(formData.capacity),
        description: formData.description,
      });
      navigate("/");
    } catch (error) {
      console.error("Launch failed:", error);
    }
  };

  return (
    <div>
      <h2>New Spacecraft</h2>
      <form onSubmit={handleSubmit}>
        {FORM_FIELDS.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[formData.name]}
                onChange={handleInputChange}
              />
            )}
            {errors[field.name] && (
              <p className={styles.errorText}>{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button type="submit" className={styles.submitButton}>
          Build Spacecraft
        </button>
      </form>
    </div>
  );
}

export default SpacecraftsNew;
