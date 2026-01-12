"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TurbosilentBLDC() {
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
                src="/images/turbo_2.png"
                alt="TurboSilent BLDC Technology"
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
              <h2 className="text-4xl tracking-tight text-[#315858]">
                <span className="text-[#bb6125] font-semibold leading-16">
                  Introducing TurboSilent BLDC:
                </span>
                <br />
                Unleashing Unmatched Power and Efficiency
              </h2>
              <p className="mt-4 text-black">
                At Haneri, we redefine engineering excellence with our
                proprietary TurboSilent BLDC Technology. This advanced motor
                design not only delivers higher torque and exceptional
                durability but also ensures unmatched energy efficiency, setting
                a new benchmark for ceiling fan performance and contributing to
                a greener environment. Our innovative technology guarantees
                whisper-quiet operation, providing a peaceful and comfortable
                atmosphere in your home or office. Additionally, the low
                maintenance requirements and long-lasting build make our fans a
                reliable and cost-effective choice for modern living.
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
                Why TurboSilent BLDC Technology?
              </h2>
              <p className="mt-4 text-black">
                TurboSilent BLDC Technology also features advanced thermal
                management solutions, allowing the motor to operate efficiently
                across a wide range of temperatures. Its compact and lightweight
                design facilitates easy integration into various applications,
                from industrial machinery to consumer electronics. Additionally,
                the system incorporates sophisticated control algorithms that
                optimize performance and responsiveness, providing smooth and
                quiet operation even under demanding conditions. With its
                innovative features, TurboSilent BLDC motors set a new standard
                for durability, efficiency, and performance in modern motor
                technology. The integration of intelligent sensors and feedback
                systems enhances real-time monitoring, enabling predictive
                diagnostics and further optimizing operational efficiency.
                Overall, TurboSilent BLDC motors represent a cutting-edge
                solution that combines innovation, durability, and versatility
                to meet the evolving demands of modern industries and electronic
                devices.
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
                src="/images/turbo_1.png"
                alt="TurboSilent BLDC Technology Features"
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
                src="/images/turbo_3.png"
                alt="Science Behind TurboSilent BLDC"
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
                The Science Behind Turbosilent BLDC Technology
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
                    <span className="text-[#315858] font-semibold">
                      Electromagnetic Optimization:
                    </span>{" "}
                    Uses Finite Element Analysis (FEA) to design and validate
                    the magnetic circuit, maximizing flux density while
                    minimizing losses.
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
                      Thermal Management:
                    </span>{" "}
                    Employs advanced cooling designs, including optimized
                    ventilation paths and materials, to maintain motor
                    efficiency under continuous operation.
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
                      Smart Power Electronics:{" "}
                    </span>{" "}
                    Integrated drivers, meticulously designed for seamless
                    operation, instil confidence with precise speed control and
                    minimal switching losses. Advanced motor control algorithms,
                    including Field-Oriented Control (FOC), enable precise
                    torque and speed regulation.
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
                      Structural Engineering:{" "}
                    </span>{" "}
                    The magnet rotor dynamics are meticulously optimized,
                    providing reassuring stability and minimizing resonance at
                    all operating speeds. Lightweight, high-strength materials
                    not only reduce the motor&apos;s overall weight but also
                    enhance its durability and performance, achieving the
                    perfect balance between these factors.
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
                Unique Advantages of TurboSilent BLDC Technology
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
                      Higher Torque for Optimized Performance :{" "}
                    </span>{" "}
                    The TurboSilent motor stands out with its superior
                    performance. It achieves higher torque through optimized
                    magnetic flux density and reduced electromagnetic losses.
                    Advanced stator and magnet designs enhance the torque
                    constant (kT), providing superior air circulation, even at
                    varying speeds.
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
                      Long-Term Durability :{" "}
                    </span>{" "}
                    Designed for long-term durability, the TurboSilent motors
                    are constructed with premium-grade laminations and
                    heat-resistant winding materials to minimize core losses and
                    thermal degradation. The motor is fitted with high-precision
                    ball bearings and balanced rotor assemblies, reducing
                    mechanical wear and extending operational life.
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
                      Enhanced Energy Efficiency :{" "}
                    </span>{" "}
                    TurboSilent motors utilize sinusoidal commutation to reduce
                    current ripple and improve efficiency. Power electronics are
                    optimized to deliver consistent performance while consuming
                    up to 65% less energy than traditional motors.
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
                      Thermal Management of Electronics :{" "}
                    </span>{" "}
                    Electronics PCBs are made in India and have been tested
                    according to Indian conditions. A key focus is the thermal
                    management of critical components to ensure longer life and
                    better performance.
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
                    <span className="text-[#315858] font-semibold">
                      In-House Innovation and Testing :{" "}
                    </span>{" "}
                    Developed using simulation tools for computational
                    electromagnetic analysis (CEM). Rigorously validated under
                    real-world conditions to ensure robustness across a wide
                    range of operating environments.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>

          {/* Why Choose Section */}
          <motion.div
            className="sm_h c01 mt-20 flex flex-col items-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl font-semibold tracking-tight text-[#315858] mb-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              Why Choose HANERI TurboSilent Ceiling Fans?
            </motion.h2>
            <motion.p
              className="text-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              HANERI'S TurboSilent BLDC Technology offers a sophisticated
              combination of engineering precision and operational excellence.
              Focusing on high torque, energy savings, and durability,
              TurboSilent motors set the gold standard in modern ceiling fan
              design.
            </motion.p>
          </motion.div>

          {/* Benefits For Customers Section */}
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
