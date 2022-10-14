import ListaNoticias from "./ListaNoticias";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Formulario = () => {
  const [news, setNews] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({pais, category}) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${pais}&category=${category}&apiKey=${process.env.REACT_APP_API}`
      );
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-100"> 
        <section className="d-flex row">
          <Form.Group className="mb-3 col-12 col-md-6" controlId="formCategory">
            <Form.Label className="text-light">Seleccionar pais</Form.Label>
            <Form.Select
              aria-label="Seleccione un pais:"
              {...register("pais", { required: "Debe seleccionar un pais" })}
            >
              <option value="">Seleccione un pais:</option>
              <option value="ar">Argentina</option>
              <option value="at">Austria</option>
              <option value="de">Alemania</option>
              <option value="be">Belgica</option>
              <option value="br">Brasil</option>
              <option value="ca">Canada</option>
              <option value="ch">China</option>
              <option value="co">Colombia</option>
              <option value="cu">Cuba</option>
              <option value="eg">Egipto</option>
              <option value="ae">Emiratos Arabes</option>
              <option value="fr">Francia</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.pais?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 col-12 col-md-6" controlId="formCategory">
            <Form.Label  className="text-light">Seleccionar categoria</Form.Label>
            <Form.Select
              aria-label="Seleccione una categoria:"
              {...register("category", {
                required: "Debe seleccionar una categoria",
              })}
            >
              <option value="">Seleccione una opcion:</option>
              <option value="science">Ciencia</option>
              <option value="sports">Deportes</option>
              <option value="entertainment">Entretenimiento</option>
              <option value="general">General</option>
              <option value="business">Negocios</option>
              <option value="health">Salud</option>
              <option value="technology">Tecnologia</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.category?.message}
            </Form.Text>
          </Form.Group>
        </section>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      <ListaNoticias news={news}></ListaNoticias>
    </div>
  );
};

export default Formulario;
