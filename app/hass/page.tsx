"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SilentHASS() {
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
                src="/images/hass_1.png"
                alt="Silent H.A.S.S Technology"
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
                  Introducing Silent H.A.S.S Technology:
                </span>
                <br />
                High Air, Slow Speed
              </h2>
              <p className="mt-4 text-black">
                At Haneri, we believe that true innovation lies in challenging
                common misconceptions and delivering solutions that redefine
                industry standards. Our Silent H.A.S.S Technology (High Air,
                Slow Speed) embodies this philosophy, and debunks the myth that
                you don&apos;t need high speed (RPM) to achieve superior air
                delivery. Leveraging our advanced Air Curve Design and
                TurboSilent BLDC Motor Technology, Silent H.A.S.S delivers
                unparalleled performance, offering powerful airflow with
                near-silent operation at lower rotational speeds. By optimizing
                airflow dynamics and minimizing noise, Haneri&apos;s Silent
                H.A.S.S Technology ensures a more comfortable and efficient user
                experience, whether in industrial settings or residential
                applications.
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
                What is Silent H.A.S.S Technology?
              </h2>
              <p className="mt-4 text-black">
                Our Silent H.A.S.S Technology (High Air, Slow Speed) challenges
                the conventional notion that higher RPM alone equals better air
                delivery. By redefining the relationship between speed, airflow,
                and silence, this innovation delivers a superior experience
                rooted in intelligent design rather than brute force.
              </p>
              <p className="mt-4 text-black">
                With Air Curve Design and TurboSilent BLDC Motor Technology,
                Silent H.A.S.S achieves remarkable airflow even at lower
                rotational speeds, maintaining a powerful yet whisper-quiet
                operation. This not only enhances comfort but also contributes
                to significant energy savings and long-term durability.
              </p>
              <p className="mt-4 text-black">
                Every fan powered by Haneri&apos;s Silent H.A.S.S system is
                meticulously engineered to optimize blade geometry, reduce
                turbulence, and minimize drag — ensuring a balanced air thrust
                across spaces of all sizes. The result is efficient cooling,
                reduced noise, and improved air circulation, redefining how
                modern ceiling fans perform in both residential and commercial
                environments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/hass_2.png"
                alt="Silent H.A.S.S Technology Features"
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
                alt="Key Features of Silent H.A.S.S"
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
                Key Features of Silent H.A.S.S Technology
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
                      High Air Delivery at Low RPM:
                    </span>{" "}
                    Precision blade contours (Air Curve Design) + high torque
                    TurboSilent BLDC deliver consistent airflow at reduced
                    speeds.
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
                      Ultra-Quiet Operation:
                    </span>{" "}
                    Low RPM with efficient torque output reduces mechanical
                    noise; streamlined profiles cut turbulence.
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
                      Enhanced Motor Efficiency:{" "}
                    </span>{" "}
                    Optimized electromagnetic design and Indian-tuned controller
                    minimize losses and cost.
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
                      Advanced Blade Aerodynamics:{" "}
                    </span>{" "}
                    CFD-driven profiles maximize air delivery per watt.
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
                      Trademarked Technology:{" "}
                    </span>{" "}
                    A proprietary Haneri pillar integrating hardware + control
                    engineering.
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
                The Science Behind H.A.S.S Technology
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
                      Aerodynamic Optimization with Air Curve Design:{" "}
                    </span>{" "}
                    Efficient pressure differential at slower speeds reduces
                    resistance and noise.
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
                      High-Torque Motor Performance:{" "}
                    </span>{" "}
                    FOC and advanced algorithms maintain smooth, precise
                    low-RPM control.
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
                      Integrated System Design:{" "}
                    </span>{" "}
                    Blades + BLDC + controller tuned together remove
                    airflow/energy bottlenecks.
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
                      Advanced Blade Aerodynamics:{" "}
                    </span>{" "}
                    CFD optimizes airflow pathways for max delivery per watt.
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
                      Trademarked Technology:{" "}
                    </span>{" "}
                    Silent H.A.S.S is a proprietary Haneri pillar for
                    performance + efficiency.
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
