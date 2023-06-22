import { useRouter } from 'next/router';
import Head from 'next/head';

type Car = {
  id: string;
  color: string;
  image: string;
}

type Props = {
  car: Car;
}

export default function Car({ car }: Props) {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <>
      <Head>
        <title>{`${car.color} ${car.id}`}</title>
      </Head>

      <h1>
        Hello {id}
      </h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={car.image} alt={car.id} width="300px"/>
    </>
  );
}

/* SSR */
// export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
//   const res = await fetch(`http://localhost:3000/${id}.json`);
//   const data = await res.json();
//
//   return {
//     props: { car: data },
//   };
// }

/* SSG */
export async function getStaticProps({ params: { id } }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/${id}.json`);
  const data = await res.json();

  return {
    props: { car: data },
    revalidate: 30, // ISR - rebuild at most every 30 seconds
  };
}

/* SSG */
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/cars.json');
  const data = await res.json();

  const paths = data.map((id: string) => {
    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}
