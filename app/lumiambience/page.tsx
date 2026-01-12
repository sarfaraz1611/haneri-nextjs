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
            className="order-2 md:order-1"
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
                       className="order-1 md:order-2"
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

          {/* Why Choose Section */}
          <motion.div
            className="mt-15"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-semibold tracking-tight text-[#315858] mb-4">
              Why Choose Haneri LumiAmbience Ceiling Fans?
            </h2>
            <p className="text-black">
              LumiAmbience Technology redefines what lighting can achieve, delivering advanced functionality and unparalleled comfort. With its unique lens diffuser,
              customizable colour options, and seamless integration with Haneri ceiling fans, LumiAmbience sets a new standard in lighting innovation. It&apos;s not just
              about illumination—it&apos;s about creating the perfect atmosphere for every moment.
            </p>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            className="mt-15"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <h2 className="text-4xl font-semibold tracking-tight text-[#315858] mb-4">
              Experience LumiAmbience Technology Today!
            </h2>
            <p className="text-black">
              Transform your space with Haneri&apos;s LumiAmbience-enabled ceiling fans. Experience lighting that adapts to your mood and lifestyle with the added
              elegance of Haneri&apos;s cutting-edge design. Choose LumiAmbience Technology—where innovation meets ambience and lighting meets perfection.
            </p>
          </motion.div>

          <div className="mt-20 flex flex-col items-start">
            <h2 className="text-4xl  mb-10 font-semibold  tracking-tight text-[#315858]">
              Benefits For Customers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8 w-full">
              <motion.div
                className="grid  grid-cols-[72px_1fr] items-start gap-3.5 p-4 rounded-lg border border-gray-200 bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src="/images/enhance_comfort.png"
                  alt="Comfort Icon"
                  width={72}
                  height={72}
                  className="object-contain mb-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#CA5C27]">
                    Enhanced Comfort
                  </h3>
                  <p className="mt-2 text-black">
                    Experience superior cooling with high air delivery, ensuring
                    a refreshing breeze in every corner of the room.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-[72px_1fr] items-start gap-3.5 p-4 rounded-lg border border-gray-200 bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <Image
                  src="/images/cost_savings.png"
                  alt="Cost Savings"
                  width={72}
                  height={72}
                  className="object-contain mb-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#CA5C27]">
                    Cost Savings
                  </h3>
                  <p className="mt-2 text-black">
                    Energy-efficient operation translates to long-term savings
                    on electricity bills.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-[72px_1fr] items-start gap-3.5 p-4 rounded-lg border border-gray-200 bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <Image
                  src="/images/sustainable_choice.png"
                  alt="Sustainable Choice"
                  width={72}
                  height={72}
                  className="object-contain mb-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#CA5C27]">
                    Sustainable Choice
                  </h3>
                  <p className="mt-2 text-black">
                    This Technology contributes to a greener, more sustainable
                    environment by reducing energy consumption.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-[72px_1fr] items-start gap-3.5 p-4 rounded-lg border border-gray-200 bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                <Image
                  src="/images/quiet_operation.png"
                  alt="Modern Aesthetics"
                  width={72}
                  height={72}
                  className="object-contain mb-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#CA5C27]">
                    Quiet Operation
                  </h3>
                  <p className="mt-2 text-black">
                    Reduced turbulence and noise make Silent M.A.S.S ideal for
                    bedrooms, offices, and libraries where silence is a
                    priority.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
