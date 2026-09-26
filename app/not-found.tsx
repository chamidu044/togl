import { PageHeader } from "@/components/layout/page-header";
import { PillLink } from "@/components/ui/pill-link";

export default function NotFound() {
  return (
    <PageHeader
      title="This page has shipped elsewhere."
      lead="The page you're looking for doesn't exist or has moved. Head back home or tell us what you need."
      className="min-h-[70vh]"
    >
      <div className="mt-9 flex flex-wrap gap-3">
        <PillLink href="/">Back to home</PillLink>
        <PillLink href="/contact" variant="secondary">
          Contact us
        </PillLink>
      </div>
    </PageHeader>
  );
}
