interface PageHeaderProps {
  heading: string,
  text?: string,
}

export default function PageHeader({ heading, text } : PageHeaderProps) {
  return (
    <div className="my-16 w-full text-center">
    { text && <span className="text-violet-400 font-bold">{text}</span> }
    <h2 className="text-4xl font-bold font-heading hover:text-red-300">{heading}</h2>
  </div>
  );
}
