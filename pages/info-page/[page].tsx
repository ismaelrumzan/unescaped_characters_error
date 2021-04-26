import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

function InfoPage({ page }: any) {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>fallback</div>;
  }
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>This is page: {page.data}</h1>
        </main>
      </div>
    </>
  );
}

export default InfoPage;

const redirect404 = () => {
  return {
    redirect: {
      destination: "/404",
      permanent: false,
    },
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  let { page } = context.params;

  page = { data: page };
  return { props: { page }, revalidate: 1 };
};

export async function getStaticPaths(context: any) {
  return {
    paths: [{ params: { page: "אאא_1" } }, { params: { page: "אאא_2" } }],
    fallback: true,
  };
}