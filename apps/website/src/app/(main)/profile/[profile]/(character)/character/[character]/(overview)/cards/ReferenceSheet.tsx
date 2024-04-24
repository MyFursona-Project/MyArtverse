import Image from "next/image"

export default function ReferenceSheet({ referenceSheet }: { referenceSheet: string }) {
  return (
    <div className="w-11/12">
      <h1 className="mb-4 text-3xl">Reference Sheet</h1>
      <Image src={referenceSheet} alt="Reference Sheet" width={1024} height={1024} />
    </div>
  )
}
