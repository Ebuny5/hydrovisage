/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Loader2,
  Footprints,
  Hand,
  Smile,
  CheckCircle2,
} from 'lucide-react';

import visageImg from '../assets/images/hydrovisage_product_1792704520097.jpg';
import gloveImg from '../assets/images/hydroglove_product_1792708963076.jpg';
import sockImg from '../assets/images/hydrosock_product_1792708976829.jpg';

export type ProductKey = 'mask' | 'sock' | 'glove';

interface ProductInfo {
  id: ProductKey;
  name: string;
  badge: string;
  headline: string;
  subhead: string;
  imgSrc: string;
  publicUrl: string;
  downloadFilename: string;
  websiteCopy: string;
  highlights: { title: string; desc: string }[];
}

const PRODUCTS: Record<ProductKey, ProductInfo> = {
  mask: {
    id: 'mask',
    name: 'HydroVisage (Face Mask)',
    badge: 'Craniofacial Electrotherapy',
    headline: 'Stop the sweat cascade at the source. Command the room with total composure.',
    subhead: 'For warriors with craniofacial hyperhidrosis. Replaces obsolete Peltier cooling with clinical-grade targeted microcurrent iontophoresis (0.1–1.5 mA).',
    imgSrc: visageImg,
    publicUrl: '/assets/hydrovisage_product.jpg',
    downloadFilename: 'HydroVisage_Finished_Product_Render.jpg',
    highlights: [
      {
        title: 'Sub-Milliamp Microcurrent Delivery (≤ 1.5 mA)',
        desc: 'Automated 5-minute biphasic polarity reversal prevents pH shifts and erythema, silencing cholinergic facial sweating without pills.',
      },
      {
        title: 'Replaceable Isotonic Hydrogel Pads',
        desc: 'Sterile 0.9% saline hydrogel contact pads mold seamlessly across forehead, temples, and philtrum with no messy water trays.',
      },
      {
        title: '25mm Periorbital Eye-Safety Buffer',
        desc: 'Silicone standoffs mechanically isolate current paths strictly to the forehead and temples, away from optic zones.',
      },
      {
        title: 'HidroAlly & Giftovate Band Sync',
        desc: 'Proactive climate and stress alerts prompt quick 15-minute maintenance sessions before visible facial sweating starts.',
      },
    ],
    websiteCopy: `TARGETED CRANIOFACIAL ELECTROTHERAPY

Face Mask: Craniofacial Mastery
Stop the sweat cascade at the source. Command the room with total composure.

For many warriors, facial sweating is the most visible and stigmatizing barrier to professional and social success. Our innovative HydroVisage face mask prototype provides targeted, silent, and clinically proven relief for craniofacial hyperhidrosis.

[Join the Pilot Program]

---

The Science of Craniofacial Iontophoresis
Facial sweating is driven by an intense concentration of hyperactive eccrine sweat glands on the forehead, temples, and cheeks. In tropical climates where ambient temperatures routinely exceed 28°C and humidity crosses 70%, the body's natural evaporative cooling system fails — leading to severe, uncontrollable perspiration.

While traditional cooling plates (Peltier modules) consume excessive battery power, generate condensation, and dump excess heat back onto the skull, HydroVisage uses targeted microcurrent iontophoresis. Gentle, calibrated sub-milliamp microcurrent (0.1–1.5 mA) safely introduces natural mineral ions into the eccrine sweat ducts, temporarily disrupting cholinergic sweat secretion for 5–8 days per maintenance session. This is not masking the symptom — it is silencing the sudomotor cascade.

---

Engineered for Composure
Every feature is designed to give warriors command over their most visible battlefield — the face:

1. Sub-Milliamp Microcurrent Delivery
Calibrated specifically for sensitive facial skin, the mask delivers a strict cranial microcurrent ceiling (≤ 1.5 mA). Automated 5-minute biphasic polarity reversal prevents pH shifts and skin redness, delivering comfortable, invisible sudomotor interception without systemic pill side effects.

2. Replaceable Isotonic Hydrogel Pads
Sterile 0.9% saline hydrogel contact pads mold seamlessly across the forehead, temple crests, and upper lip. No messy water trays or dripping water — just uniform, comfortable ionic contact engineered for tropical humidity.

3. 25mm Anatomical Periorbital Eye-Safety Buffer
Engineered with non-conductive medical silicone standoffs that mechanically guarantee all electrical pathways remain strictly on the forehead and temples, well clear of the orbital eye sockets and optic nerves.

4. HidroAlly & Giftovate Band Integration
Seamlessly syncs with your Giftovate Band and HidroAlly app. When sudomotor sensors detect an imminent sympathetic spike, HidroAlly prompts a quick 15-minute maintenance session to stabilize your sudomotor baseline before visible sweating begins.`,
  },
  sock: {
    id: 'sock',
    name: 'HydroSock (Plantar Socks)',
    badge: 'The Plantar Protocol',
    headline: 'Ending "Shoe-Removal Anxiety" and Restoring Every Confident Step.',
    subhead: 'Five-toe plantar iontophoresis socks. Replaces Peltier cooling claims with zoned isotonic hydrogel electrodes for the toes, ball of foot, and heel.',
    imgSrc: sockImg,
    publicUrl: '/assets/hydrosock_product.jpg',
    downloadFilename: 'HydroSock_Finished_Product_Render.jpg',
    highlights: [
      {
        title: 'Five-Toe Anatomical Zone Electrodes',
        desc: 'Individual toe caps, ball-of-foot, arch, and heel hydrogel pads deliver 100% complete plantar coverage impossible with flat trays.',
      },
      {
        title: 'Firm Gait & Anti-Slip Stability',
        desc: 'Eliminates slippery hazards inside sandals, slippers, and tile floors by normalizing stratum corneum hydration.',
      },
      {
        title: 'Zero Odor & Maceration Prevention',
        desc: 'Silver-infused antimicrobial knit and cholinergic sweat duct normalization eliminate the root cause of foot maceration and odor.',
      },
      {
        title: 'Tropical Climate Resilience',
        desc: 'Breathable Bamboo-Merino moisture-wicking knit and lightweight snap-on ankle controller deliver effortless home and travel treatments.',
      },
    ],
    websiteCopy: `THE PLANTAR PROTOCOL

HydroSock: Targeted Five-Toe Plantar Electrotherapy
Ending "Shoe-Removal Anxiety" and Restoring Every Confident Step.

For warriors with plantar hyperhidrosis, every day feels like walking through a rainstorm inside their shoes. While traditional cooling ideas or bulky water-basin trays fail in active daily life, our HydroSock five-toe wearable is engineered with moisture-wicking natural fibers (Bamboo and Merino Wool) and five-zone isotonic hydrogel iontophoresis electrodes to eliminate the "Catch-22" of enclosed footwear.

[Join the Pilot Program]

---

The Science of Plantar Iontophoresis
Plantar hyperhidrosis is driven by one of the highest densities of eccrine sweat glands on the human body concentrated across the toes, metatarsal ball, arch, and heel. In warm and tropical climates, sweat accumulates rapidly inside enclosed footwear, causing epidermal maceration, odor-producing bacterial breakdown, and dangerous loss of traction.

Unlike Peltier thermoelectric units that generate exterior heat and condensation without altering sweat gland output, HydroSock delivers targeted, low-voltage direct microcurrent through five anatomically mapped isotonic hydrogel zones. Mild mineral ions temporarily normalize cholinergic sweat output at the duct level, providing 5–10 days of dry, stable gait per maintenance session.

---

Revolutionary Plantar Care
Every feature is engineered to restore confidence, stability, and freedom for warriors with plantar hyperhidrosis:

1. Firm Gait, No More Slips
Eliminates dangerous "slippery accidents" inside sandals, slippers, or bare floors. By stopping excessive plantar secretion at the source, you walk at your natural cadence with total biomechanical stability in a dry, high-friction footbed.

2. Odor-Free Shoe Removal
Antimicrobial silver-infused fibers combined with sweat duct normalization neutralize odor-causing bacteria at the root cause rather than masking it with perfumes. Remove your shoes at home, work, or social gatherings with zero trepidation.

3. Tile-Safe Confidence & Zero Maceration
Stop living in fear of leaving damp footprints or white maceration rings on parquet and polished tile flooring. The Plantar Protocol maintains an intact, dry stratum corneum for clean, confident footing anywhere.

4. Anatomical Five-Toe Zone Electrodes
Unlike flat water tubs that fail to reach sweaty toe webs, HydroSock features individual five-toe hydrogel contact caps, ball-of-foot pads, and heel contact points for 100% comprehensive plantar coverage.

5. Tropical Resilience & All-Day Comfort
Engineered specifically for tropical climates where ambient heat exceeds 28°C and humidity is smothering. Breathable Bamboo-Merino knit keeps feet cool, while the lightweight snap-on ankle pod delivers quiet, portable treatments.

---

Integration with HidroAlly
Giftovate hardware is the "physical edge" of the HidroAlly ecosystem. Through the Wearable Sensor Simulator and Giftovate Band, users track real-time Electrodermal Activity (EDA) and Heart Rate. When HidroAlly detects an imminent sympathetic spike triggered by climate or stress, it sends a proactive alert:

"Extreme conditions detected (32°C). Your sudomotor baseline is elevating. Schedule a 15-minute HydroSock maintenance session tonight to keep your footbed dry and prevent slipping tomorrow."

• Real-time EDA and sympathetic tone monitoring via Giftovate Band
• Proactive climate- and stress-triggered maintenance prompts before visible sweating begins
• Seamless longitudinal treatment logging in your HidroAlly analytics dashboard`,
  },
  glove: {
    id: 'glove',
    name: 'HydroGlove (Palmar Glove)',
    badge: 'The Palmar Protocol',
    headline: 'Dry Hands, Confident Handshakes, and Unrestricted Professional Command.',
    subhead: 'Portable palmar iontophoresis glove. Eliminates messy water trays with ergonomic isotonic contact pads across the palm and fingertips.',
    imgSrc: gloveImg,
    publicUrl: '/assets/hydroglove_product.jpg',
    downloadFilename: 'HydroGlove_Finished_Product_Render.jpg',
    highlights: [
      {
        title: 'Full Palm & Fingertip Zoned Treatment',
        desc: 'Conforms to natural hand anatomy with contoured hydrogel pads covering the entire palm and finger pads.',
      },
      {
        title: 'Complete Freedom from Water Trays',
        desc: 'Wearable design enables reading, working, or relaxing during treatments without being anchored to a table.',
      },
      {
        title: 'Biphasic Polarity Auto-Reversal',
        desc: 'Smart 10-minute automated polarity reversal ensures equal therapeutic benefit between both hands with zero discomfort.',
      },
      {
        title: 'Touchscreen-Compatible Fingertips',
        desc: 'Conductive fingertip weaves let you use smartphones and tablets while receiving therapy.',
      },
    ],
    websiteCopy: `THE PALMAR PROTOCOL

HydroGlove: Portable Palmar Electrotherapy
Dry Hands, Confident Handshakes, and Unrestricted Professional Command.

For warriors with palmar hyperhidrosis, wet hands interfere with touchscreen devices, paper documents, social handshakes, and everyday confidence. HydroGlove frees warriors from bulky, immobile water trays with wearable, targeted microcurrent iontophoresis.

[Join the Pilot Program]

---

The Science of Palmar Iontophoresis
Palmar sweating is triggered by dense cholinergic innervation of eccrine glands on the palms and fingertip pads. HydroGlove utilizes contoured isotonic saline hydrogel pads and breathable technical compression knit to deliver calibrated 8–15 mA DC microcurrent evenly across the palm and fingertips, temporarily neutralizing excessive sweat secretion for up to a week per maintenance session.

---

Key Features:
1. Complete Mobility — No Messy Water Trays
Snap on the pre-moistened isotonic pads, secure the magnetic wrist pod, and complete your treatment while working or relaxing.

2. Smart Biphasic Polarity Control
Automated 10-minute polarity reversal balances ionic distribution equally between both hands, preventing erythema and ensuring uniform dryness.

3. Touchscreen-Compatible & Tactile Freedom
Engineered with conductive fingertips so you can operate smartphones and keyboards during treatments.

4. HidroAlly Predictive Sync
Pairs with the Giftovate Band to forecast palmar trigger spikes and schedule treatments before high-stakes meetings or presentations.`,
  },
};

interface ProductExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: ProductKey;
}

export const ProductExportModal: React.FC<ProductExportModalProps> = ({
  isOpen,
  onClose,
  initialProduct = 'mask',
}) => {
  const [activeProduct, setActiveProduct] = useState<ProductKey>(initialProduct);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && initialProduct) {
      setActiveProduct(initialProduct);
    }
  }, [isOpen, initialProduct]);

  if (!isOpen) return null;

  const current = PRODUCTS[activeProduct];

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadJpg = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      // 1. Fetch raw binary image data (tries bundled asset first, falls back to public asset)
      let blob: Blob | null = null;
      try {
        const response = await fetch(current.imgSrc);
        if (response.ok) {
          blob = await response.blob();
        }
      } catch (e) {
        console.warn('Bundled fetch error, trying public asset:', e);
      }

      if (!blob) {
        const fallbackResponse = await fetch(current.publicUrl);
        blob = await fallbackResponse.blob();
      }

      // 2. Explicitly force MIME type to image/jpeg
      const jpegBlob = new Blob([blob], { type: 'image/jpeg' });

      // 3. Create blob URL and trigger download via DOM anchor
      const blobUrl = window.URL.createObjectURL(jpegBlob);
      const downloadLink = document.createElement('a');
      downloadLink.style.display = 'none';
      downloadLink.href = blobUrl;
      downloadLink.setAttribute('download', current.downloadFilename);
      downloadLink.download = current.downloadFilename;
      document.body.appendChild(downloadLink);
      downloadLink.click();

      setTimeout(() => {
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);
        setIsDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }, 700);
    } catch (err) {
      console.error('Blob download failed, executing Canvas base64 fallback:', err);
      // Canvas fallback: guarantees a genuine data:image/jpeg stream
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 1024;
          canvas.height = img.naturalHeight || 768;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = current.downloadFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        } catch (canvasErr) {
          console.error('Canvas export error:', canvasErr);
        }
        setIsDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      };
      img.onerror = () => {
        setIsDownloading(false);
      };
      img.src = current.imgSrc;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-teal-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Giftovate Commercial Renders & Website Kits
              </h2>
              <p className="text-[11px] text-slate-500">
                High-resolution standalone product photography & updated copy for giftovate.world
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Product Switcher Tabs */}
        <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-start sm:justify-center overflow-x-auto gap-1.5">
          <button
            onClick={() => {
              setActiveProduct('mask');
              setDownloadSuccess(false);
            }}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeProduct === 'mask'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>HydroVisage (Face Mask)</span>
          </button>

          <button
            onClick={() => {
              setActiveProduct('sock');
              setDownloadSuccess(false);
            }}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeProduct === 'sock'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>HydroSock (Plantar Socks)</span>
          </button>

          <button
            onClick={() => {
              setActiveProduct('glove');
              setDownloadSuccess(false);
            }}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeProduct === 'glove'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>HydroGlove (Palmar Glove)</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* 1. Commercial Product Photo Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                  {current.badge} • Commercial Render
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{current.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standalone commercial studio render (no human body parts, clean light backdrop).
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadJpg}
                  disabled={isDownloading}
                  className={`py-2 px-3.5 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                    downloadSuccess
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-teal-700 hover:bg-teal-800'
                  } disabled:opacity-60 cursor-pointer`}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving JPG...</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Downloaded JPG!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Photo (HD JPG)</span>
                    </>
                  )}
                </button>

                <a
                  href={current.imgSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center justify-center gap-1 shadow-2xs transition-colors"
                  title="Open full resolution in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Open</span>
                </a>
              </div>
            </div>

            {/* Image Preview Container */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white aspect-[4/3] max-h-[380px] flex items-center justify-center shadow-xs">
              <img
                src={current.imgSrc}
                alt={`${current.name} Commercial Product Render`}
                className="w-full h-full object-contain select-auto pointer-events-auto"
                loading="eager"
              />
            </div>

            {/* Mobile tip helper */}
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 bg-white border border-slate-200 rounded-lg p-2.5">
              <span className="font-semibold text-slate-700">📱 Mobile Tip:</span>
              <span>
                You can tap <strong>Download Photo</strong>, or tap and hold (long-press) the picture above and select <strong>&ldquo;Save image&rdquo;</strong> to store it in your phone gallery.
              </span>
            </div>
          </div>

          {/* 2. Key Highlights / Anti-Peltier Upgrades */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Clinical Engineering Upgrades (Iontophoresis Protocol)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {current.highlights.map((h, i) => (
                <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-1.5 text-teal-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{h.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Updated Website Copy (Ready to Paste on giftovate.world) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Updated Website Text for giftovate.world
                </h4>
                <p className="text-xs text-slate-500">
                  Rewritten to reflect clinical iontophoresis instead of obsolete Peltier cooling.
                </p>
              </div>

              <button
                onClick={() => handleCopy(current.websiteCopy, `${activeProduct}-all`)}
                className="py-1.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                {copiedSection === `${activeProduct}-all` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied All!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Full Page Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Preformatted copyable box */}
            <div className="relative rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-4 font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{current.websiteCopy}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
