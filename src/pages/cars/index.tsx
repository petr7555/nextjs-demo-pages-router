import CarLink from '@/components/CarLink';

type Props = {
  carIds: string[];
}

export default function Cars({ carIds }: Props) {
  return (
    <>
      <h1>
        Cars list
      </h1>
      {carIds.map((id) => (
        <CarLink key={id} id={id}/>
      ))}
    </>
  );
}

/* SSR */
// export async function getServerSideProps() {
//   const res = await fetch('http://0.0.0.0:3000/cars.json');
//   const data = await res.json();
//
//   return {
//     props: { carIds: data },
//   };
// }

/* SSG */
export async function getStaticProps() {
  const res = await fetch('http://0.0.0.0:3000/cars.json');
  const data = await res.json();

  return {
    props: { carIds: data },
  };
}
