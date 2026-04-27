import { Link } from "@inertiajs/react";

const Footer = () => {
  return (
    <div className="bg-background pb-20 lg:pb-0">
      <div className="p-4 md:flex md:items-center md:justify-between md:gap-4 lg:px-16">
        <Link className="text-primary text-3xl font-bold">Mamorulist</Link>
        <p className="text-primary-dark my-4 text-sm">
          Mamorulist is a website created to help anime fans make informed
          choices about the content they watch.
        </p>
        <div className="flex gap-4">
          <ul>
            <li>
              <Link className="text-primary-dark text-sm">FAQ</Link>
            </li>
            <li>
              <Link className="text-primary-dark text-sm">About</Link>
            </li>
            <li>
              <Link className="text-primary-dark text-sm">Contact</Link>
            </li>
          </ul>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default Footer;
