export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href="/css/devansh_pagedescription.css" />
      {children}
    </>
  );
}
