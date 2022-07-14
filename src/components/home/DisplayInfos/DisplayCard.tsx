interface DisplayCardProps {
  quantity: number;
  status: string;
}

export function DisplayCard({ quantity, status }: DisplayCardProps) {
  return (
    <div className="flex flex-col items-start justify-center">
      <p className="text-2xl font-bold text-white">{quantity}</p>
      <p className="text-[#BFBFCC]">{status}</p>
    </div>
  );
}
