import Head from 'next/head';
import WiCSLogo from "@/app/public/wics-logos/blue_coloured_small.png";

export default function Metadata({ title, description, pageUrl }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={WiCSLogo} />
      <meta property="og:url" content={pageUrl} />
    </Head>
  );
}