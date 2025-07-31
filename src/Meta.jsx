// components/HeadMeta.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const Meta = () => {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    axios.get('https://dev.pandgholding.binary-group.com/admin/api/meta')
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setMeta(response.data[0]);
        }
      });
  }, []);

  if (!meta) return null;

  const keywordsArray = typeof meta.meta_keywords_multiple === 'string'
    ? meta.meta_keywords_multiple.split(',').map(k => k.trim())
    : [];

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.meta_description} />
        <meta name="keywords" content={keywordsArray.join(',')} />
        {meta.favicon && (
          <link
            rel="icon"
            href={`https://dev.pandgholding.binary-group.com/admin/${meta.favicon}`}
            type="image/webp"
            sizes="32x32"
          />
        )}
      </Helmet>
    </>
  );
};

export default Meta;
