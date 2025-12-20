"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AirCurveDesign() {
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
                src="/images/air_1.png"
                alt="Air Curve Design"
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
                <span className="text-[#bb6125] font-semibold">
                  Introducing Air Curve Design:
                </span>
                <br />
                Redefining Ceiling Fan Efficiency
              </h2>
              <p className="mt-4 text-black">
                Haneri is the brainchild of a passionate team with over 75 years
                of collective experience in the consumer durable industry. With
                expertise spanning product creation, innovation, engineering, and
                manufacturing, we envisioned Haneri as a brand that caters to
                consumers seeking products that seamlessly blend with modern
                living. At Haneri, our mission is to inspire everyday life by
                offering thoughtfully designed, functional, and future-ready
                solutions.
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
                Why is Air Curve Design?
              </h2>
              <p className="mt-4 text-black">
                Air Curve Design is a cutting-edge blade technology that
                leverages advanced computational modelling and simulation to
                craft blades optimized for maximum airflow and energy
                efficiency. This innovation ensures that every curve and angle
                of the blade is scientifically tailored for superior
                aerodynamics, delivering a ceiling fan that offers unparalleled
                performance, energy efficiency, and style.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/air_2.png"
                alt="Air Curve Design Technology"
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
                src="/images/air_4.png"
                alt="Science Behind Air Curve Design"
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
                The Science Behind Air Curve Design
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
                      Computational Fluid Dynamics (CFD):
                    </span>{" "}
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
                      Prototyping and Testing:{" "}
                    </span>{" "}
                    Multiple prototypes are tested under real-world conditions
                    to validate performance metrics such as air delivery, noise
                    levels, and energy consumption.
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
                      Iterative Design:{" "}
                    </span>{" "}
                    Continuous refinement based on data-driven insights ensures
                    that AirCurve blades exceed industry benchmarks for
                    performance and reliability.
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
