import { Link } from "@inertiajs/react";

const DekstopNav = () => {
  return (
    <div className="bg-surface flex w-full items-center justify-between p-4">
      <Link className="text-primary font-serif text-2xl font-bold tracking-wider">
        Mamorulist
      </Link>
      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <Link className="text-accent-gold text-sm">Home</Link>
          </li>
          <li>
            <Link className="text-sm">Browse Anime</Link>
          </li>
          <li>
            <Link className="text-sm">Trigger List</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="border-primary rounded-md border px-2 py-1 placeholder:text-sm"
          placeholder="Search anime..."
        />
        <div>
          <Link className="bg-primary text-surface mr-2 rounded-md p-2 text-sm">
            Register
          </Link>
          <Link className="bg-accent-gold text-surface rounded-md p-2 text-sm">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DekstopNav;
