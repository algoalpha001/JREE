import svgPaths from "./svg-2zizivw7ff";
import { imgGroup } from "./svg-b09vu";

function Group1() {
  return (
    <div className="absolute inset-[15.03%_26.09%_14.95%_26.15%]" data-name="Group">
      <div className="absolute inset-[0_-1.02%_-0.7%_-1.02%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 499.025 721.965">
          <g id="Group">
            <path d={svgPaths.p3d9d3180} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #0E0D11)" strokeMiterlimit="10" strokeWidth="10" />
            <path d={svgPaths.p233fba00} fill="var(--fill-0, #231F20)" id="Vector_2" />
            <path d={svgPaths.pb65920} fill="var(--fill-0, #C9DC53)" id="Vector_3" />
            <path d={svgPaths.p34c8d280} fill="var(--fill-0, white)" id="Vector_4" />
            <g id="Group_2">
              <path d={svgPaths.p2c101f80} fill="var(--fill-0, white)" id="Vector_5" />
              <path d={svgPaths.p27484300} fill="var(--fill-0, white)" id="Vector_6" />
              <path d={svgPaths.p7fff300} fill="var(--fill-0, white)" id="Vector_7" />
              <path d={svgPaths.p2e94e00} fill="var(--fill-0, white)" id="Vector_8" />
            </g>
            <g id="Group_3">
              <path d={svgPaths.p11cf66d0} fill="var(--fill-0, #F9F9FA)" id="Vector_9" />
              <path d={svgPaths.pb784f00} fill="var(--fill-0, #F9F9FA)" id="Vector_10" />
              <path d={svgPaths.p20c98a00} fill="var(--fill-0, #F9F9FA)" id="Vector_11" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[55.43%_17.55%_16.56%_17.64%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[116.291px_-319.784px] mask-size-[430.805px_585.004px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
      <div className="absolute inset-[-2.3%_-0.52%_-1.08%_-0.52%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 670.522 296.517">
          <g id="Group">
            <path d={svgPaths.pdc0c800} fill="var(--fill-0, #C9DC53)" id="Vector" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="3" />
            <path d={svgPaths.p27a25300} fill="var(--fill-0, #51C1B5)" id="Vector_2" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="3" />
            <path d={svgPaths.p28cd6100} fill="var(--fill-0, #6C56A4)" id="Vector_3" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[24.2%_28.94%_18.67%_28.99%]" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[39.14%_31.18%_26.75%_27.49%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 423.28 349.275">
        <g id="Group">
          <path d={svgPaths.p3a2298f0} fill="var(--fill-0, #0E0D11)" id="Vector" />
          <path d={svgPaths.p23686500} fill="var(--fill-0, #0E0D11)" id="Vector_2" />
          <g id="Group_2">
            <path d={svgPaths.p83a5c00} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.p28546b80} fill="var(--fill-0, white)" id="Vector_4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[15.03%_26.09%_14.95%_26.15%]" data-name="Group">
      <Group1 />
      <ClipPathGroup />
      <Group3 />
    </div>
  );
}

export default function JreeAppIconCircular() {
  return (
    <div className="relative size-full" data-name="JREE_App icon — circular 1">
      <div className="absolute inset-[0.04%_-0.03%_-0.04%_0.03%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1024 1024">
          <path d={svgPaths.p32806d00} fill="var(--fill-0, #6D56A4)" id="Vector" />
        </svg>
      </div>
      <Group />
    </div>
  );
}