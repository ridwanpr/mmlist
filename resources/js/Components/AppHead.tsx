import { Head } from "@inertiajs/react";

type AppHeadProps = {
  title?: string;
  meta?: string;
};

const AppHead = ({ title, meta }: AppHeadProps) => {
  return (
    <Head>
      <title>
        {title
          ? `${title} - Mamorulist`
          : "Anime Content Guide & Database | Mamorulist"}
      </title>
      <meta
        // eslint-disable-next-line react/no-unknown-property
        head-key="description"
        name="description"
        content={
          meta
            ? `${meta}`
            : "Find anime content guide and community-rated content flags on Mamorulist. Search your favorite series and safely manage your anime watchlist"
        }
      />
    </Head>
  );
};

export default AppHead;
