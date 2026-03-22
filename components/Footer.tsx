import Link from "next/link";
import { FaHome, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function Footer() {
  const companyInfo = {
    name: "Haneri",
    address: `HANERI ELECTRICALS LLP
A-48, SECTOR 57, NOIDA, UTTAR PRADESH, PINCODE - 201301`,
    phone: "+91-8377826826",
    email: "info@haneri.com",
  };

  return (
    <footer className="bg-[#005d5a] text-white pt-[60px] pb-5  max-sm:pt-10">
      <div className="container">
        <div className="mb-10">
          <div className="grid grid-cols-[2fr_1fr_1fr_2fr] gap-10 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[30px]">
            <div className="flex flex-col">
              <div>
                <Link href="/">
                  <img
                    src="/images/logo_white.png"
                    alt="Haneri Logo"
                    className="max-w-[150px] h-auto"
                  />
                </Link>
              </div>
            </div>

            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-5 text-white">
                Pillar Technology
              </h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-3">
                  <Link
                    href="/air-curve-design"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    Air Curve Design
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/turbosilent-bldc"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    Turbosilent BLDC
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/hass"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    HASS
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/lumiambience"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    Lumiambience
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/scan"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    SCAN
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-5 text-white">
                Our Policy
              </h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-3">
                  <Link
                    href="/faqs"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    FAQs
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/privacy-policy"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/shipping-policy"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/wir-policy"
                    className="text-white text-sm transition-colors hover:text-brand"
                  >
                    WIR Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-5 text-white">
                Company Info
              </h4>
              <div className="flex flex-col gap-[15px]">
                <div className="flex gap-3 items-start text-sm text-white">
                  <FaHome className=" mt-1 shrink-0" />
                  <a
                    href="https://maps.google.com/?q=A-48+Sector+57+Noida+Uttar+Pradesh+201301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-colors hover:text-brand"
                  >
                    {companyInfo.address}
                  </a>
                </div>
                <div className="flex gap-3 items-start text-sm text-white">
                  <FaPhone className=" mt-1 shrink-0" />
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-white transition-colors hover:text-brand"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
                <div className="flex gap-3 items-start text-sm text-white">
                  <FaEnvelope className=" mt-1 shrink-0" />
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-white transition-colors hover:text-brand"
                  >
                    {companyInfo.email}
                  </a>
                </div>
                <div className="flex gap-3 items-start text-sm text-white">
                  <FaClock className=" mt-1 shrink-0" />
                  <span>Mon - Sun / 9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333] pt-5 text-center">
          <span className="text-sm text-[#999]">&copy; 2026 | Haneri</span>
        </div>
      </div>
    </footer>
  );
}
