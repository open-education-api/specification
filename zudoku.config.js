export default {
  basePath: "/zudoku/dist",
  prerender: false,
  build: {
    outDir: "../.."
  },
  navigation: [
    { type: "link", to: "api", label: "API Reference" }
  ],
  apis: {
    type: "file",
    input: "../ooapi.zudoku.json",
    path: "api",
    options: {
      expandAllTags: false
    },
  },
  theme: {
    customCss: `
      /* Verberg zudoku-placeholder elementen */
      h2[id^="zudoku-placeholder"] {
        display: none !important;
      }
      
      .grid.grid-cols-1.lg\\:grid-cols-\\[minmax\\(0\\,4fr\\)_minmax\\(0\\,3fr\\)\\]:has(h2[id^="zudoku-placeholder"]) {
        display: none !important;
      }
      
      .grid.grid-cols-1.lg\\:grid-cols-\\[minmax\\(0\\,4fr\\)_minmax\\(0\\,3fr\\)\\]:has(h2[id^="zudoku-placeholder"]) + hr {
        display: none !important;
      }
      
      a[data-anchor^="zudoku-placeholder"] {
        display: none !important;
      }
      
      ul:has(> a[data-anchor^="zudoku-placeholder"]:only-child) {
        display: none !important;
      }



/* ===== Zudoku injected MODEL operations (zudoku-model-for-*) ===== */



/* Hide nav items for injected model pages */
a[data-anchor^="zudoku-model-for-"] {
  display: none !important;
}
ul:has(> a[data-anchor^="zudoku-model-for-"]:only-child) {
  display: none !important;
}



/* Hide the injected operation title + method/path line */
.grid:has(h2[id^="zudoku-model-for-"]) > h2[id^="zudoku-model-for-"] {
  display: none !important;
}
.grid:has(h2[id^="zudoku-model-for-"]) > h2[id^="zudoku-model-for-"] + div {
  display: none !important;
}



/* Hide only the request/cURL sidecar (first box), keep Example Responses on the right */
.grid:has(h2[id^="zudoku-model-for-"])
  aside > div[data-slot="sidecar-box-root"]:first-of-type {
  display: none !important;
}



/* Hide the "Documentation only..." prose block on the left */
.grid:has(h2[id^="zudoku-model-for-"])
  .flex.flex-col.gap-4:has(> .prose) > .prose {
  display: none !important;
}

/* Hide the "Responses" heading and the separator above it */
.grid:has(h2[id^="zudoku-model-for-"]) h3[id$="/responses"],
.grid:has(h2[id^="zudoku-model-for-"]) .flex.flex-col.gap-4 > [data-slot="separator"] {
  display: none !important;
}


/* Hide the top response header area that contains "200 OK" and the grey summary text.
   Keep the actual schema/properties block (frame-panel) intact. */
.grid:has(h2[id^="zudoku-model-for-"])
  div[data-slot="frame"] > div.flex.flex-col.text-muted-foreground {
  display: none !important;
}
/* Verberg chevron voor tags die eindigen op -model */
a[href$="-model"] > div > button,
a[href$="-model/"] > div > button {
  display: none !important;
}


/* Target de div met class code-block die max-h-[200px] bevat */
div.code-block[class*="max-h-[200px]"] {
  max-height: 600px !important;
}


`
  },
};
