// app/page.tsx
import { BrandSection } from "./components/brandsection";
export const brandSections = [
  {
    id: "haneri",
    title: "Haneri",
    description:
      "is a movement driven by a relentless passion to transform the way we live. By turning everyday routines into moments of inspiration, Haneri redefines what consumer experiences can be. At its heart lies innovation, seamlessly combining cutting-edge technology, exceptional quality, and luxurious design—all made accessible to everyone. Motivated by a vision to empower and elevate, Haneri crafts solutions that simplify life while enriching spaces with beauty and sophistication. It’s not just about creating products—it’s about delivering on a commitment to help people live better, dream bigger, and turn their environments into havens of comfort and joy. With Haneri, the future of living begins now—where inspiration meets innovation, and the ordinary becomes extraordinary.",
    image: "/images/section/Haneri_Homes.jpg",
    reverse: false,
  },
  {
    id: "bespoke",
    title: "FanCraft embodies",
    description:
      "personalization at its finest, bringing individuality and style to your living or workspace. With a focus on allowing consumers to select colors, finishes, and materials crafted to their preferences, it bridges the gap between functionality and self-expression. Whether you're refreshing your home décor or conceptualizing a modern office, “FanCraft” transforms your vision into reality. It is more than a product; it's an extension of your personality, crafted to reflect your unique identity while seamlessly blending with your environment. Experience the art of personalized luxury, designed exclusively for you.",
    image: "/images/section/Haneri_Bespoke1.png",
    reverse: true,
  },
  {
    id: "professional",
    title: "Haneri Professional",
    description: `solutions are purpose-built to address the diverse and large-scale needs of industries and businesses. Engineered with precision, these products are designed to deliver exceptional performance and unwavering reliability, even in the most challenging environments. Crafted to endure rigorous demands, they combine robust durability with cutting-edge technology. By ensuring seamless functionality and consistent results, "Haneri Professional" empowers enterprises to enhance productivity, optimize operations, and achieve sustainable success with confidence.`,
    image: "/images/section/Haneri_Professional.jpg",
    reverse: false,
  },
];


export default function Page() {
  return (
    <div className="mt-20">
      {brandSections.map((item) => (
        <BrandSection key={item.id} {...item} />
      ))}
    </div>
  );
}
