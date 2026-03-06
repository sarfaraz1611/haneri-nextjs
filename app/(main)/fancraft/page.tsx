"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FanCraft() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[90%] py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          {/* Section 1 - Text Left, Image Right */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="mb-6">
                <Image
                  src="/images/fnss.png"
                  alt="FanCraft Logo"
                  width={200}
                  height={60}
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl tracking-tight text-[#315858]">
                <span className="text-[#bb6125] font-semibold">
                  Personalised Air. Perfected Aesthetics.
                </span>
                <br />
                <strong>Every space has a story. Every ceiling, a canvas.</strong>
              </h2>
              <p className="mt-4 text-black">
                Every space has a story. Every ceiling, a canvas. FanCraft by
                Haneri turns your ceiling fan into a reflection of your personal
                taste — where colour, finish, and emotion come together in
                harmony.
              </p>
              <p className="mt-4 text-black">
                From deep metallic tones and satin pastels to dual-shade blends
                and signature textures, FanCraft lets you custom-curate your
                fan&apos;s colour palette to complement your interiors. Whether you
                want the calm of ivory and gold, the boldness of graphite and
                rosewood, or an entirely bespoke hue crafted just for you — the
                choice is yours.
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
                src="/images/fan_craft_1.png"
                alt="FanCraft Custom Ceiling Fan"
                width={800}
                height={533}
                className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
              />
            </motion.div>
          </div>

          {/* Section 2 - Image Left, Text Right */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2 mt-15">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/fan_craft_2.png"
                alt="FanCraft Design Process"
                width={800}
                height={533}
                className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
              />
            </motion.div>

            <motion.div
              className="order-2 lg:order-2"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[#315858]">
                Design the Air Around You
              </h2>
              <p className="mt-4 text-black">
                At FanCraft, design begins with emotion — with the subtle
                interplay between what you feel and what you see. It&apos;s an
                intimate process, rooted in the belief that the spaces we inhabit
                are not just built; they are felt. Every shade we create tells a
                story — a whisper of mood, a memory of light, a reflection of who
                you are. Through colour, texture, and finish, we translate emotion
                into design — transforming the ordinary into a personal expression
                of taste.
              </p>
              <p className="mt-4 text-black">
                Each hue carries its own soul: the soft serenity of satin pastels
                that evoke calm and grace; the confident depth of graphite and
                rosewood that speak of strength and sophistication; the timeless
                harmony of ivory brushed with gold that radiates quiet luxury.
                These are not just colours — they are feelings, captured and
                crafted to live on your ceiling.
              </p>
              <p className="mt-4 text-black">
                Our design specialists take this philosophy further. They work
                hand in hand with you, understanding your rhythm, your
                inspirations, and the story your home wishes to tell. Every
                conversation becomes a creative dialogue — a journey through
                tones, finishes, and combinations that mirror your aesthetic. From
                your first idea to the final stroke of craftsmanship, each detail
                is refined to achieve perfect balance — ensuring your fan
                complements your interiors not as an accessory, but as an integral
                piece of art.
              </p>
            </motion.div>
          </div>

          {/* Section 3 - Text Left, Image Right */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2 mt-15">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[#315858]">
                Where Art Meets Engineering
              </h2>
              <p className="mt-4 text-black">
                Behind the artistry lies Haneri&apos;s legacy of engineering
                excellence — a philosophy where beauty and precision coexist in
                perfect equilibrium. Every FanCraft creation is the result of
                decades of research, refined craftsmanship, and an unwavering
                pursuit of perfection. What begins as a design sketch transforms
                into a meticulously engineered masterpiece, brought to life
                through advanced techniques such as precision electroplating, UV
                metalizing, and custom paintwork, each executed under the keen eye
                of our artisans and engineers.
              </p>
              <p className="mt-4 text-black">
                Every finish, texture, and tone is curated not only for its
                aesthetic appeal but also for its resilience. Each layer is tested
                against time, humidity, and wear — ensuring that the brilliance
                you see today remains just as luminous for years to come. Our
                artisans hand-finish every blade, polish every contour, and
                inspect every component with a level of care that machines alone
                could never replicate.
              </p>
              <p className="mt-4 text-black">
                From the core motor assembly to the outermost sheen, FanCraft by
                Haneri represents a perfect synthesis of artistry and engineering
                — a union of durability and design that stands as beautifully as
                it performs. Every fan we craft isn&apos;t just built to move air;
                it&apos;s built to move you.
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
                src="/images/fan_craft_3.png"
                alt="FanCraft Engineering Excellence"
                width={800}
                height={533}
                className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
