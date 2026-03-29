"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SilentHASS() {
  return (
    <div className="container">
      <div className="mx-auto py-24  sm:py-32">
        <div className="mx-auto max-w-2xl  lg:max-w-none">
          {/* Section 1 - Image Left */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/hass_1.png"
                alt="HASS Technology"
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
              <h2 className="text-5xl  heading tracking-tight text-[#005d5a] xl:max-w-3/4">
                <span className="text-[#bb6125] heading">
                  Introducing HASS Technology{" "}
                </span>
                <br />
                High Air, Slow Speed
              </h2>
              <p
                className="text-[16px] mt-4 font-normal text-gray-500 "
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                At Haneri, we believe that true innovation lies in challenging
                common misconceptions and delivering solutions that redefine
                industry standards. Our HASS Technology (More Air,
                Slow Speed) embodies this philosophy, and debunks the myth that
                you don’t need high speed (RPM) to achieve superior air
                delivery. Leveraging our advanced Air Curve Design and
                TurboSilent BLDC Motor Technology, HASS delivers
                unparalleled performance, offering powerful airflow with
                near-silent operation at lower rotational speeds.
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
              <h2 className="text-5xl heading tracking-tight text-[#005d5a]">
                What is HASS Technology?{" "}
              </h2>
              <p
                className="text-[16px] mt-4 font-normal text-gray-500 "
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
               HASS Technology is a revolutionary integration of
                Haneri’s two engineering marvels—Air Curve Design and
                TurboSilent BLDC Motor Technology. By combining aerodynamically
                optimized blades with high-torque, energy-efficient motors, this
                Trademark Registered Pillar Technology achieves exceptional air
                delivery at reduced RPM, redefining ceiling fan performance
                while ensuring whisper-quiet operation.
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
                src="/images/hass_2.png"
                alt="HASS Technology Features"
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
                src="/images/hass_3.png"
                alt="Key Features of HASS"
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
              <h2 className="text-5xl heading tracking-tight text-[#005d5a]">
                Key Features of HASS Technology
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
                    <span className="text-[#005d5a] font-semibold">
                      High Air Delivery at Low RPM:
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      Powered by Air Curve Design, the blades feature
                      precision-engineered contours that maximize air
                      displacement while optimizing drag. High torque from the
                      TurboSilent BLDC Motor ensures efficient blade rotation,
                      delivering consistent airflow even at reduced speeds.
                    </span>
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
                    <span className="text-[#005d5a] font-semibold">
                      Ultra-Quiet Operation:
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      The low RPM operation, combined with Efficient Torque
                      output from the TurboSilent BLDC Motor, eliminates
                      mechanical noise, creating an ultra-quiet cooling
                      experience. Streamlined blade profiles reduce turbulence,
                      further contributing to silent performance.
                    </span>
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
                    <span className="text-[#005d5a] font-semibold">
                      Enhanced Motor Efficiency:{" "}
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      TurboSilent BLDC motors utilize advanced electromagnetic
                      design for optimal torque-to-RPM ratios, ensuring seamless
                      operation at low speeds. Electronic Controller which has
                      been made in India as per Indian Conditions , minimizes
                      energy losses, making the system highly efficient and
                      cost-effective.
                    </span>
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
                    <span className="text-[#005d5a] font-semibold">
                      Advanced Blade Aerodynamics:{" "}
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      Blades designed with Air Curve Design use computational
                      fluid dynamics (CFD) to optimize airflow pathways,
                      ensuring maximum air delivery per watt of power consumed.
                    </span>
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
                    <span className="text-[#005d5a] font-semibold">
                      Trademarked Technology:{" "}
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                     HASS Technology is a Trademark Registered Pillar
                      of Haneri, integrating proprietary engineering solutions
                      to deliver performance and efficiency.
                    </span>
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
              <h2 className="text-5xl heading tracking-tight text-[#005d5a]">
                The Science Behind HASS Technology
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
                    <span className="text-[#005d5a] font-semibold">
                      Aerodynamic Optimization with Air Curve Design:{" "}
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      Advanced blade profiles create an efficient pressure
                      differential, maximizing air displacement while operating
                      at slower speeds. The design minimizes resistance and
                      turbulence, reducing energy wastage and noise.
                    </span>
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
                    <span className="text-[#005d5a] font-semibold">
                      High-Torque Motor Performance:{" "}
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      TurboSilent BLDC Motors leverage high torque generation to
                      power blades effectively at low RPM, ensuring consistent
                      airflow without overloading the system. Field-oriented
                      control (FOC) and advanced motor algorithms enable precise
                      speed regulation, maintaining performance consistency.
                    </span>
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
                    <span className="text-[#005d5a] font-semibold">
                      Integrated System Design:{" "}
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      The synergy between Air Curve Design and TurboSilent BLDC
                      Motors ensures that every component is optimized for
                      efficiency and performance, eliminating bottlenecks in
                      airflow or energy transfer.
                    </span>
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
                    <span className="text-[#005d5a] font-semibold">
                      Energy Optimization :{" "}
                    </span>{" "}
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      Combined with energy-efficient motor controls and low-drag
                      blade designs, Silent HASS Technology reduces power
                      consumption significantly, contributing to lower
                      operational costs and a smaller carbon footprint.
                    </span>
                  </span>
                </motion.li>

                {/* <motion.li
                  className="text-black flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                >
                  <span className="mr-2">•</span>
                  <span>
                    <span className="text-[#005d5a] font-semibold">
                      Trademarked Technology:{" "}
                    </span>{" "}
                    Silent HASS is a proprietary Haneri pillar for
                    performance + efficiency.
                  </span>
                </motion.li> */}
              </motion.ul>
            </motion.div>
          </div>
          {/* Benefits For Customers Section */}
          <div className="mt-20 flex flex-col items-start">
            <h2 className="text-5xl  mb-10 heading  tracking-tight text-[#005d5a]">
              Benefits for Customers
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
                  <h3 className="text-xl font-semibold text-[#ca5d27]">
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
                  <h3 className="text-xl font-semibold text-[#ca5d27]">
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
                  <h3 className="text-xl font-semibold text-[#ca5d27]">
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
                  <h3 className="text-xl font-semibold text-[#ca5d27]">
                    Quiet Operation
                  </h3>
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily: "var(--font-open-sans)",
                      fontWeight: 400,
                    }}
                  >
                    Reduced turbulence and noise make Silent HASS ideal for
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
