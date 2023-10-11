type Props = {
  actions?: React.ReactNode;
  body?: React.ReactNode;
};

export function EntityItem({ actions, body }: Props) {
  return (
    <div className="flex items-start justify-between gap-2 px-4 py-2">
      <div className="flex flex-col gap-1">{body}</div>
      <div>{actions}</div>
    </div>
  );
}
