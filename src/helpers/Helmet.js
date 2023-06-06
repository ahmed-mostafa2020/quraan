import Head from "next/head"

const Helmet = ({title}) => {
  return (
    <>
      <Head>
        <title>جروب القرءان الكريم | {title}</title>
        <meta name="description" content="جروب القراءن الكريم" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blob14.svg" />
      </Head>

    </>
  )
}

export default Helmet;