import TimeAgo from '../../../Components/TimeAgo';
import Pagination from '../../../Components/UI/Pagination';
import BackLayout from '../../../Layouts/BackLayout';

type ContactMessageProps = {
  paginatedContacts: App.DTOs.PaginatedContactData;
};

const ContactMessage = ({ paginatedContacts }: ContactMessageProps) => {
  return (
    <div className="bg-background min-h-screen">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-text font-serif text-2xl font-semibold">Contact Message</h1>
          <p className="text-text-muted mt-0.5 text-sm">
            {paginatedContacts.total} message from the user
          </p>
        </div>
      </div>

      <div className="border-border bg-surface overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse text-left font-sans">
          <thead>
            <tr className="border-border bg-surface-alt text-text-muted border-b text-xs font-semibold tracking-wider uppercase">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Content</th>
              <th className="px-6 py-3">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-border text-text divide-y text-sm">
            {paginatedContacts.data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-text-muted px-6 py-10 text-center">
                  No comments discovered in the database.
                </td>
              </tr>
            ) : (
              paginatedContacts.data.map(contact => (
                <tr key={contact.id} className="hover:bg-surface-alt/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{contact.id}</td>
                  <th className="px-6 py-3">{contact.name}</th>
                  <th className="px-6 py-3">{contact.email ?? '-'}</th>
                  <th className="px-6 py-3 whitespace-nowrap">{contact.content}</th>
                  <td className="text-text-muted px-6 py-4 whitespace-nowrap">
                    <TimeAgo dateString={contact.createdAt} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination links={paginatedContacts.links} />
    </div>
  );
};

ContactMessage.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default ContactMessage;
