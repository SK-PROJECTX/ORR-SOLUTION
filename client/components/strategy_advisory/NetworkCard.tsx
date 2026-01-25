import { getRichTextHTML } from "@/lib/rich-text-utils";

interface NetworkCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function NetworkCard({ title, description, icon }: NetworkCardProps) {
  return (
    <div className="bg-primary flex flex-col items-start justify-between rounded-lg px-8 pt-8 pb-16 w-full md:w-86 lg:w-82">
      <div className="w-16 h-16 mb-6 bg-white/20 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d={icon}/>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-4">
        <span dangerouslySetInnerHTML={getRichTextHTML(title)} />
      </h3>
      <p className="text-white/90 text-sm mb-6">
        <span dangerouslySetInnerHTML={getRichTextHTML(description)} />
      </p>
      <button className="bg-white text-black px-6 py-2 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
        Join Now
      </button>
    </div>
  );
}