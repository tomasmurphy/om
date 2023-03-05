import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";

const Seo = ({ title, description, pathSlug, image}) => {
  const url = `${pathSlug}`;
  return (
    <HelmetProvider>
    <Helmet
      htmlAttributes={{ lang: "es" }}
      title={title}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          property: "og:descripcion",
          content: description,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:site_name",
          content: "Mobilem",
        },
        {
          property: "og:url",
          content: url,
        },
        {
          property: "og:image",
          content: image,
        },
      ]}
      links={[
        {
          rel: "canonical",
          href: url,
        },
      ]}
    />
    </HelmetProvider>
  );
};
export default Seo;
