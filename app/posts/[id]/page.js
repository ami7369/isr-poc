import styles from "../../page.module.css";
export const dynamicParams = true; //fallback=blocking
export const revalidate = 10; // 10secごとに再検証する

const endpoint = `${process.env.ENDPOINT}/marine_blog`;

export async function generateStaticParams() {
  const data = await fetch(endpoint).then((res)=>res.json());
  const paths = data.contents.map((post) => {
   return {
     id: post.id,
   };
 });

 return [...paths];
}

export default async function Post({ params }) {
  console.log("Check,params",params.id)
  const {id} = params;
  const post = await fetch(`${endpoint}/${id}`, { next: { revalidate } }).then((res) => res.json())
  
  return (
    <div className={styles.main}>
      <article style={{ margin: 20 }}>
        <h1>{post.title}</h1>
        <p className={styles.timestamp}>published：{post.publishedAt}</p>
        <p className={styles.timestamp}>updated：{post.updatedAt}</p>
      </article>
    </div>
  );
}