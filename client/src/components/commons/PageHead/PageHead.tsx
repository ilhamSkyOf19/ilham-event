import Head from "next/head";

interface PropsTypes {
  title?: string;
}

//
const PageHead = (props: PropsTypes) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/images/general/logo.svg" type="image/x-icon" />
    </Head>
  );
};

// export
export default PageHead;
