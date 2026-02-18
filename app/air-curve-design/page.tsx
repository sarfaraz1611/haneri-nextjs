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
              <h2 className="text-4xl tracking-tight  text-[#315858]">
                <span className="text-[#bb6125] font-semibold mb-1 text-4xl  tracking-tight">
                  Introducing Air Curve Design:
                </span>
                <br />
                Redefining Ceiling Fan Efficiency
              </h2>
              <p
                className="text-[16px] mt-4 font-normal text-gray-500 "
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                At Haneri, innovation drives us to create products that are not
                only stylish but also deliver superior performance. Our
                revolutionary Air Curve Design technology transforms how ceiling
                fan blades are conceptualized, designed, and manufactured. With
                high-tech design and precision engineering, blades designed with
                Air Curve Design Technology offer unmatched air delivery,
                efficiency, and durability, showcasing the superiority of our
                product.
              </p>
            </motion.div>
          </div>

          {/* Section 2 - Text Left, Image Right */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2 mt-15">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-semibold  tracking-tight text-[#315858]">
                What is Air Curve Design?
              </h2>
              <p
                className="text-[16px] mt-4 font-normal text-gray-500 "
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
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
              className="order-1 lg:order-2"
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

          {/* Key Features Section */}
          <div className="mt-20">
            <h2 className="text-4xl  mb-10 font-semibold  tracking-tight text-[#315858]">
              Key Features of Air Curve Design
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                className="grid grid-cols-[72px_1fr] items-start gap-3.5 p-4 rounded-lg border border-gray-200 bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src="/images/hight_air_delivery.png"
                  alt="High Air Delivery"
                  width={72}
                  height={72}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#315858]">
                    High Air Delivery
                  </h3>
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily:
                        'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                      fontWeight: 400,
                    }}
                  >
                    Air Curve blades are engineered to maximize airflow,
                    providing a powerful and consistent cooling experience. They
                    are designed to deliver optimal air circulation even in
                    large spaces.
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
                  src="/images/energy_efficiency.png"
                  alt="Energy Efficiency"
                  width={72}
                  height={72}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#315858]">
                    Energy Efficiency
                  </h3>
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily:
                        'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                      fontWeight: 400,
                    }}
                  >
                   The aerodynamic profile of Air Curve blades optimizes drag, reducing the load on the motor and ensuring energy-efficient operation. Thanks to their energy-efficient operation, you
                    can enjoy a powerful cooling experience while saving on
                    electricity bills.
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
                  src="/images/advance_material.png"
                  alt="Advanced Materials"
                  width={72}
                  height={72}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#315858]">
                    Advanced Materials
                  </h3>
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily:
                        'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                      fontWeight: 400,
                    }}
                  >
                    Air Curve blades are crafted using high-strength,
                    lightweight materials, ensuring durability and optimal blade
                    weight for efficient rotation. You can trust in the
                    longevity of your cooling solution.
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
                  src="/images/silent_performance.png"
                  alt="Silent Performance"
                  width={72}
                  height={72}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#315858]">
                    Silent Performance
                  </h3>
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily:
                        'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                      fontWeight: 400,
                    }}
                  >
                    The streamlined blade design minimizes turbulence, ensuring
                    whisper-quiet operation, ideal for residential and
                    professional settings.
                  </p>
                </div>
              </motion.div>
            </div>
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
                    <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
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
                    <span className="text-[#315858] font-bold">
                      Prototyping and Testing:{" "}
                    </span>{" "}
                      <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                    Multiple prototypes are tested under real-world conditions
                    to validate performance metrics such as air delivery, noise
                    levels, and energy consumption.
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
                      Iterative Design:{" "}
                    </span>{" "}
                     <span
                      className="text-[16px] font-normal text-gray-500 "
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                    Continuous refinement based on data-driven insights ensures
                    that Air Curve blades exceed industry benchmarks for
                    performance and reliability.
                  </span>
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>

          {/* Benefits For Customers Section */}
          <div className="mt-20 flex flex-col items-start">
            <h2 className="text-4xl  mb-10 font-semibold  tracking-tight text-[#315858]">
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
                  <h3 className="text-xl font-semibold text-[#CA5C27]">
                    Enhanced Comfort
                  </h3>
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily:
                        'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                      fontWeight: 400,
                    }}
                  >
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
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily:
                        'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                      fontWeight: 400,
                    }}
                  >
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
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily:
                        'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                      fontWeight: 400,
                    }}
                  >
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
                  <p
                    className="mt-2 text-black"
                    style={{
                      fontFamily:
                        'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
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
