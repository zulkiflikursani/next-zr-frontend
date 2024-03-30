type User =
  | {
      id?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;
type Props = {
  user: User;
  pagetype: string;
  api?: string;
};
const Card = ({ user, pagetype, api }: Props) => {
  const greeting = user?.name ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {user?.name}!
    </div>
  ) : null;
  const emailDisplay = user?.email ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {user?.email}!
    </div>
  ) : null;
  return (
    <section>
      {greeting}
      {emailDisplay}
      <p className="">{pagetype}</p>
    </section>
  );
};

export default Card;
