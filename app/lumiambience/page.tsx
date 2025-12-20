"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LumiAmbience() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[90%] py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          {/* Section 1 - Image Left */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/lumi_1.png"
                alt="LumiAmbience Technology"
                width={800}
                height={533}
                className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover lg:order-1"
              />
            </motion.div>

            <motion.div
              className="lg:order-2"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-semibold tracking-tight text-[#315858]">
                <span className="text-[#bb6125]">
                  Introducing LumiAmbience Technology:
                </span>{" "}
                Revolutionizing Lighting with Precision
              </h2>
              <p className="mt-4 text-black">
                At Haneri we push the boundaries of innovation, not just in
                cooling but also in creating holistic lifestyle solutions. Our
                revolutionary LumiAmbience Technology transforms lighting into
                an experience, offering unparalleled control, comfort, and a
                sense of ease. Designed as an optional feature for select
                ceiling fans, LumiAmbience combines advanced lighting
                engineering with Haneri&apos;s signature aesthetic excellence.
              </p>
            </motion.div>
          </div>

          {/* Section 2 - Text Left, Image Right */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2 mt-15">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-semibold tracking-tight text-[#315858]">
                What is LumiAmbience Technology?
              </h2>
              <p className="mt-4 text-black">
                LumiAmbience Technology integrates a state-of-the-art 3-in-1 LED
                lighting system into select Haneri ceiling fans, allowing you to
                adapt your lighting to any mood or occasion. The system features
                Warm White, Cool White, and Natural White light modes, each
                engineered for specific settings. LumiAmbience stands apart with
                its proprietary lens diffuser that ensures even light
                distribution, eliminates harsh LED spots, and creates a soothing
                ambience for your space. LumiAmbience Technology enhances your
                environment with customizable lighting options, seamlessly
                integrating into Haneri ceiling fans. Its energy-efficient
                design, long-lasting LEDs, and user-friendly controls make it an
                ideal choice for modern, stylish homes and offices. The
                innovative lens diffuser not only improves light quality but
                also reduces glare, providing comfort and elegance. Enjoy
                effortless mood setting, improved ambiance, and energy savings
                all in one sophisticated system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/lumi_2.png"
                alt="LumiAmbience Technology Features"
                width={800}
                height={533}
                className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
              />
            </motion.div>
          </div>

          {/* Section 3 - Image Left with List */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2 mt-15">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/lumi_3.png"
                alt="Key Features of LumiAmbience"
                width={800}
                height={533}
                className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover lg:order-1"
              />
            </motion.div>

            <motion.div
              className="lg:order-2"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-semibold tracking-tight text-[#315858]">
                Key Features of Silent LumiAmbience Technology
              </h2>

              <motion.ul
                className="mt-4 space-y-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                }}
              >
                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      High Air Delivery at Low RPM:{" "}
                    </span>
                    Powered by Air Curve Design, the blades feature
                    precision-engineered contours that maximize air displacement
                    while optimizing drag. High torque from the TurboSilent BLDC
                    Motor ensures efficient blade rotation, delivering
                    consistent airflow even at reduced speeds.
                  </span>
                </motion.li>

                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      Ultra-Quiet Operation:{" "}
                    </span>
                    The low RPM operation, combined with Efficient Torque output
                    from the TurboSilent BLDC Motor, eliminates mechanical
                    noise, creating an ultra-quiet cooling experience.
                    Streamlined blade profiles reduce turbulence, further
                    contributing to silent performance.
                  </span>
                </motion.li>

                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      Enhanced Motor Efficiency:{" "}
                    </span>
                    TurboSilent BLDC motors utilize advanced electromagnetic
                    design for optimal torque-to-RPM ratios, ensuring seamless
                    operation at low speeds. The electronic controller, made in
                    India for Indian conditions, minimizes energy losses, making
                    the system highly efficient and cost-effective.
                  </span>
                </motion.li>

                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      Advanced Blade Aerodynamics:{" "}
                    </span>
                    Blades designed with Air Curve Design use computational
                    fluid dynamics (CFD) to optimize airflow pathways, ensuring
                    maximum air delivery per watt of power consumed.
                  </span>
                </motion.li>

                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      Trademarked Technology:{" "}
                    </span>
                    Silent M.A.S.S Technology is a trademarked pillar of Haneri,
                    integrating proprietary engineering solutions to deliver
                    performance and efficiency.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>

          {/* Section 4 - Full Width List */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-1 mt-15">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-semibold tracking-tight text-[#315858]">
                The Science Behind LumiAmbience Technology
              </h2>
              <motion.ul
                className="mt-4 space-y-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  staggerChildren: 0.12,
                  delayChildren: 0.2,
                }}
              >
                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      Advanced LED Engineering:{" "}
                    </span>
                    LumiAmbience LEDs are crafted to produce precise colour
                    temperatures, ensuring true-to-life illumination for each
                    mode. High-quality diodes enhance durability and reduce
                    power consumption, aligning with energy-saving standards.
                  </span>
                </motion.li>

                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      Proprietary Lens Diffuser Technology:{" "}
                    </span>
                    The lens diffuser evenly distributes light, eliminating
                    glare and harsh points of illumination. Optical-grade
                    materials ensure consistent performance and long-term
                    clarity.
                  </span>
                </motion.li>

                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      Precision Circuitry:{" "}
                    </span>
                    Intelligent LED drivers enable smooth transitions between
                    colour modes and brightness levels, offering users
                    unparalleled control and customization.
                  </span>
                </motion.li>

                <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#315858] font-bold">
                      Energy Optimization:{" "}
                    </span>
                    Advanced power management minimizes energy wastage, ensuring
                    high brightness with low power consumption.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
