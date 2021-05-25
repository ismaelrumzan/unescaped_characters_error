import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

function InfoPage({ data }: any) {
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
          <h1 className={styles.title}>This is the data: {data.data}</h1>
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
  const resp = await fetch(
    "https://nextjs-unescaped-character-cms.vercel.app/cms.json"
    //"https://raw.githubusercontent.com/onezero-team/unescaped_characters_error_cms/main/cms.json"
  );
  const data = await resp.json();
  return { props: { data }, revalidate: 1 };
};

export async function getStaticPaths(context: any) {
  return {
    paths: [{ params: { page: "אאא_1" } }, { params: { page: "فعل" } }, { params: { page: "page" } }],
    //paths: [{ params: { page: "page1" } }, { params: { page: "page2" } }],
    fallback: true,
  };
}
