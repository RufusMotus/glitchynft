<template>
  <div class="control-panel">
    <ControlAsset
      title="Head"
      :asset-name="props.headAssets[props.headAssetIndex]?.assetName"
      asset-type="head"
      @prev-asset="emits('prevAsset', 'head')"
      @next-asset="emits('nextAsset', 'head')"
    />
    <ControlAsset
      title="Face"
      :asset-name="props.faceAssets[props.faceAssetIndex]?.assetName"
      asset-type="face"
      @prev-asset="emits('prevAsset', 'face')"
      @next-asset="emits('nextAsset', 'face')"
    />
    <ControlAsset
      title="Left Arm"
      :asset-name="props.leftArmAssets[props.leftArmAssetIndex]?.assetName"
      asset-type="leftArm"
      @prev-asset="emits('prevAsset', 'leftArm')"
      @next-asset="emits('nextAsset', 'leftArm')"
    />
    <ControlAsset
      title="Left Hand"
      :asset-name="props.leftHandAssets[props.leftHandAssetIndex]?.assetName"
      asset-type="leftHand"
      @prev-asset="emits('prevAsset', 'leftHand')"
      @next-asset="emits('nextAsset', 'leftHand')"
    />
    <ControlAsset
      title="Body"
      :asset-name="props.bodyAssets[props.bodyAssetIndex]?.assetName"
      asset-type="body"
      @prev-asset="emits('prevAsset', 'body')"
      @next-asset="emits('nextAsset', 'body')"
    />
    <ControlAsset
      title="Right Arm"
      :asset-name="props.rightArmAssets[props.rightArmAssetIndex]?.assetName"
      asset-type="rightArm"
      @prev-asset="emits('prevAsset', 'rightArm')"
      @next-asset="emits('nextAsset', 'rightArm')"
    />
    <ControlAsset
      title="Right Hand"
      :asset-name="props.rightHandAssets[props.rightHandAssetIndex]?.assetName"
      asset-type="rightHand"
      @prev-asset="emits('prevAsset', 'rightHand')"
      @next-asset="emits('nextAsset', 'rightHand')"
    />
    <ControlAsset
      title="Left Leg"
      :asset-name="props.leftLegAssets[props.leftLegAssetIndex]?.assetName"
      asset-type="leftLeg"
      @prev-asset="emits('prevAsset', 'leftLeg')"
      @next-asset="emits('nextAsset', 'leftLeg')"
    />
    <ControlAsset
      title="Right Leg"
      :asset-name="props.rightLegAssets[props.rightLegAssetIndex]?.assetName"
      asset-type="rightLeg"
      @prev-asset="emits('prevAsset', 'rightLeg')"
      @next-asset="emits('nextAsset', 'rightLeg')"
    />
    <ControlColor
      title="Background Color"
      :color="props.color"
      @color-change="(color) => emits('colorChange', color)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Asset from "../../interfaces/asset";
import ControlAsset from "./ControlAsset.vue";
import ControlColor from "./ControlColor.vue";

const props = defineProps<{
  headAssets: Array<Asset>;
  headAssetIndex: number;
  faceAssets: Array<Asset>;
  faceAssetIndex: number;
  leftArmAssets: Array<Asset>;
  leftArmAssetIndex: number;
  leftHandAssets: Array<Asset>;
  leftHandAssetIndex: number;
  bodyAssets: Array<Asset>;
  bodyAssetIndex: number;
  rightArmAssets: Array<Asset>;
  rightArmAssetIndex: number;
  rightHandAssets: Array<Asset>;
  rightHandAssetIndex: number;
  leftLegAssets: Array<Asset>;
  leftLegAssetIndex: number;
  rightLegAssets: Array<Asset>;
  rightLegAssetIndex: number;
  color: string;
}>();

const emits = defineEmits<{
  (e: "prevAsset", type: string): void;
  (e: "nextAsset", type: string): void;
  (e: "colorChange", type: string): string;
}>();
const color = computed(() => props.color);
const hoverColor = computed(() => `${color.value}9F`);
</script>

<style scoped lang="scss">
.control-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :deep(.control) {
    .control-wrapper {
      .icon {
        color: v-bind(color);
        transition: color 0.3s ease-in-out;
        &:hover {
          color: v-bind(hoverColor);
        }
      }
    }
  }
}
</style>
