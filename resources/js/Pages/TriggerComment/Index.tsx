import FrontLayout from "../../Layouts/FrontLayout";

const TriggerComment = () => {
  return (
    <div>
      <div className="mx-auto mb-8 max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]"></div>
      </div>
    </div>
  );
};

TriggerComment.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default TriggerComment;
