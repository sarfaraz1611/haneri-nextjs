"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SCANTechnology() {
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
                src="/images/scan_1.png"
                alt="S.C.A.N Technology"
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
                <span className="text-[#315858]">
                  Discover the Future of Fan with:
                </span>
                <br />
                <span className="text-[#bb6125]">S.C.A.N Technology</span>
              </h2>
       <p
                className="text-[16px] mt-4 font-normal text-gray-500 "
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
               At HANERI, we've combined innovation with convenience in our state-of-the-art S.C.A.N Technology (Smooth Control , Advance Navigation). This technology, designed for the modern home, redefines your interaction with ceiling fans, offering an optional LED light for added convenience. With its sleek aesthetics and advanced functionality, this futuristic remote controller ensures seamless control, an enhanced user experience, and cutting-edge technology, all at your fingertips.
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
                What is S.C.A.N Technology?
              </h2>
       <p
                className="text-[16px] mt-4 font-normal text-gray-500 "
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
            S.C.A.N Technology is a next-generation radio frequency (RF) control system that offers unparalleled convenience and precision when operating ceiling fans. With advanced control features such as speed adjustment, lighting control, timer settings, and unique operating modes, S.C.A.N Technology brings futuristic functionality into the palm of your hand.
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
                src="/images/scan_2.png"
                alt="S.C.A.N Technology Features"
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
                src="/images/scan_3.png"
                alt="Key Features of S.C.A.N Technology"
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
                Key Features of Silent S.C.A.N Technology
              </h2>

              <motion.ul
                className="mt-4 space-y-2"
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
                      Futuristic Design:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      The S.C.A.N remote controller, with its ergonomic design,
                      intuitive button placement, and sleek, modern look, offers
                      a convenient and comfortable user experience.
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
                    <span className="text-[#315858] font-bold">
                      Comprehensive Fan Control:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Effortlessly adjust fan speed across multiple levels,
                      giving you complete control over your cooling experience.
                      Includes two unique modes: Breeze Mode Simulates natural
                      airflow patterns, creating a relaxing and refreshing
                      environment. Turbo Speed Mode Activates maximum fan speed
                      for quick and powerful cooling.
                    </span>
                    <br />
                    <span className="mr-2">•</span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <span className="text-[#315858] font-bold">
                        {" "}
                        Breeze Mode:{" "}
                      </span>{" "}
                      Simulates natural airflow patterns, creating a relaxing
                      and refreshing environment.
                    </span>

                    <br />
                    <span className="mr-2">•</span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <span className="text-[#315858] font-bold">
                        {" "}
                        Turbo Speed Mode:{" "}
                      </span>
                      Activates maximum fan speed for quick and powerful
                      cooling.
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
                    <span className="text-[#315858] font-bold">
                      LED Light Integration:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Control LED lights (where available) with the same remote,
                      including switching on/off and changing the Colour Tones
                      if the product is equipped with Haneri&apos;s LumiAmbience
                      Technology. Synchronizes seamlessly with fans, offering
                      complete control and convenience.
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
                    <span className="text-[#315858] font-bold">
                      Advanced Timer Functionality:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Control LED lights (where available) with the same remote,
                      including switching on/off and changing the Colour Tones
                      if the product is equipped with Haneri&apos;s LumiAmbience
                      Technology. Synchronizes seamlessly with fans, offering
                      complete control and convenience.
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
                    <span className="text-[#315858] font-bold">
                      Reliable Radio Frequency Control:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      The S.C.A.N remote controller operates on advanced RF
                      technology, ensuring reliable control from greater
                      distances without requiring line-of-sight. This gives you
                      a secure and confident experience, and it eliminates
                      signal interference for a smooth and responsive
                      experience.
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
                    <span className="text-[#315858] font-bold">
                      Power Efficiency:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Low-power RF communication ensures extended battery life
                      for the remote controller.
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
              <h2 className="text-4xl font-semibold tracking-tight text-[#315858]">
                The Science behind S.C.A.N Technology
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
                    <span className="text-[#315858] font-semibold">
                      Radio Frequency (RF) Innovation:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Operates on robust RF bands to provide uninterrupted
                      control even through walls or obstructions. Advanced
                      signal encoding prevents interference from other wireless
                      devices, ensuring reliability.
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
                    <span className="text-[#315858] font-semibold">
                      Integrated Microcontroller System:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Embedded microcontroller units (MCUs) process user inputs
                      for instantaneous response. The system supports
                      multi-functional commands, enabling simultaneous fan speed
                      and light adjustments.
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
                    <span className="text-[#315858] font-semibold">
                      Energy Optimization:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Timer algorithms and innovative sleep modes ensure
                      energy-efficient operation of both the remote and
                      connected devices.
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
                    <span className="text-[#315858] font-semibold">
                      Multi-Mode Control Logic:{" "}
                    </span>
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Breeze Mode Powered by dynamic speed variation algorithms
                      to mimic natural airflow.
                      <br /> Turbo Mode Leverages direct motor communication to
                      maximize fan performance instantly.
                    </span>
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>

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
