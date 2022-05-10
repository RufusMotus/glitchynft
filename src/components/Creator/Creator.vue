<template>
  <div class="creator">
    <template v-if="saveSuccess">
      <div class="success">
        <div class="title">Your GlitchyNFT was created successfully!</div>
        <div class="description">
          You can check it out on your account page.
        </div>
        <Button title="Go to your account" @click="goToAccount" />
      </div>
    </template>
    <template v-else>
      <div class="preview">
        <div class="wrapper">
          <input
            type="text"
            id="glitchyNFT-name"
            :class="{ error: nameError }"
            placeholder="Name your GlitchyNFT"
            v-model="name"
          />
          <div class="character-wrapper" ref="character">
            <div class="character-background">
              <template v-for="n in 70"
                >{{ userid }} {{ userUniqueBackground }}</template
              >
            </div>
            <div class="character">
              <div class="top-limb">
                <div class="head">
                  <img
                    :src="headAssets[headAssetIndex]?.assetBody"
                    :alt="headAssets[headAssetIndex]?.assetName"
                    loading="lazy"
                  />
                </div>
                <div class="face">
                  <img
                    :src="faceAssets[faceAssetIndex]?.assetBody"
                    :alt="faceAssets[faceAssetIndex]?.assetName"
                    loading="lazy"
                  />
                </div>
              </div>
              <div class="middle-limbs">
                <div class="left-middle-limb">
                  <div class="left-arm">
                    <img
                      :src="leftArmAssets[leftArmAssetIndex]?.assetBody"
                      :alt="leftArmAssets[leftArmAssetIndex]?.assetName"
                      loading="lazy"
                    />
                  </div>
                  <div class="left-hand">
                    <img
                      :src="leftHandAssets[leftHandAssetIndex]?.assetBody"
                      :alt="leftHandAssets[leftHandAssetIndex]?.assetName"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div class="body">
                  <img
                    :src="bodyAssets[bodyAssetIndex]?.assetBody"
                    :alt="bodyAssets[bodyAssetIndex]?.assetName"
                    loading="lazy"
                  />
                </div>
                <div class="right-middle-limb">
                  <div class="right-hand">
                    <img
                      :src="rightHandAssets[rightHandAssetIndex]?.assetBody"
                      :alt="rightHandAssets[rightHandAssetIndex]?.assetName"
                      loading="lazy"
                    />
                  </div>
                  <div class="right-arm">
                    <img
                      :src="rightArmAssets[rightArmAssetIndex]?.assetBody"
                      :alt="rightArmAssets[rightArmAssetIndex]?.assetName"
                    />
                  </div>
                </div>
              </div>
              <div class="bottom-limbs">
                <div class="left-leg">
                  <img
                    :src="leftLegAssets[leftLegAssetIndex]?.assetBody"
                    :alt="leftLegAssets[leftLegAssetIndex]?.assetName"
                    loading="lazy"
                  />
                </div>
                <div class="right-leg">
                  <img
                    :src="rightLegAssets[rightLegAssetIndex]?.assetBody"
                    :alt="rightLegAssets[rightLegAssetIndex]?.assetName"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="controls">
          <ControlPanel
            :head-assets="headAssets"
            :head-asset-index="headAssetIndex"
            :face-assets="faceAssets"
            :face-asset-index="faceAssetIndex"
            :left-arm-assets="leftArmAssets"
            :left-arm-asset-index="leftArmAssetIndex"
            :left-hand-assets="leftHandAssets"
            :left-hand-asset-index="leftHandAssetIndex"
            :body-assets="bodyAssets"
            :body-asset-index="bodyAssetIndex"
            :right-arm-assets="rightArmAssets"
            :right-arm-asset-index="rightArmAssetIndex"
            :right-hand-assets="rightHandAssets"
            :right-hand-asset-index="rightHandAssetIndex"
            :left-leg-assets="leftLegAssets"
            :left-leg-asset-index="leftLegAssetIndex"
            :right-leg-assets="rightLegAssets"
            :right-leg-asset-index="rightLegAssetIndex"
            :color="backgroundColor"
            @prev-asset="prevAsset"
            @next-asset="nextAsset"
            @color-change="colorChange"
          />
        </div>
      </div>
      <Button title="Save GlitchyNFT" @click="saveGlitchyNFT" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { toPng } from "html-to-image";
import { useStore } from "../../store/storeMain";
import Asset from "../../interfaces/asset";
import ControlPanel from "./ControlPanel.vue";
import Button from "../Atoms/Button.vue";

const store = useStore();
const character = ref(null);
const name = ref("");
const nameError = ref(false);
const saveSuccess = ref(false);
const backgroundColor = ref("#00a313");
const backgroundColorWrapper = computed(() => `${backgroundColor.value}9A`);
const backgroundColorText = computed(() => `${backgroundColor.value}2F`);

const headAssets = ref<Array<Asset>>([]);
const faceAssets = ref<Array<Asset>>([]);
const leftArmAssets = ref<Array<Asset>>([]);
const leftHandAssets = ref<Array<Asset>>([]);
const bodyAssets = ref<Array<Asset>>([]);
const rightArmAssets = ref<Array<Asset>>([]);
const rightHandAssets = ref<Array<Asset>>([]);
const rightLegAssets = ref<Array<Asset>>([]);
const leftLegAssets = ref<Array<Asset>>([]);

const headAssetIndex = ref(0);
const faceAssetIndex = ref(0);
const leftArmAssetIndex = ref(0);
const leftHandAssetIndex = ref(0);
const rightArmAssetIndex = ref(0);
const rightHandAssetIndex = ref(0);
const bodyAssetIndex = ref(0);
const leftLegAssetIndex = ref(0);
const rightLegAssetIndex = ref(0);

const userid = ref(store?.user?.$id);
const userUniqueBackground = Math.random().toString(36).substring(2);

const colorChange = (color: string) => {
  backgroundColor.value = color;
};

const headPromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("headAssets")
      .then((res) => {
        headAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const facePromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("faceAssets")
      .then((res) => {
        faceAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const leftArmPromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("leftArmAssets")
      .then((res) => {
        leftArmAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const leftHandPromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("leftHandAssets")
      .then((res) => {
        leftHandAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const bodyPromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("bodyAssets")
      .then((res) => {
        bodyAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const rightArmPromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("rightArmAssets")
      .then((res) => {
        rightArmAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const rightHandPromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("rightHandAssets")
      .then((res) => {
        rightHandAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const leftLegPromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("leftLegAssets")
      .then((res) => {
        leftLegAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const rightLegPromise = () => {
  return new Promise<void>((resolve, reject) => {
    store.appwrite.database
      .listDocuments("rightLegAssets")
      .then((res) => {
        rightLegAssets.value = res.documents as Array<Asset>;
        resolve();
      })
      .catch(() => reject());
  });
};

const prevAsset = (asset: string) => {
  switch (asset) {
    case "head":
      headAssetIndex.value > 0
        ? headAssetIndex.value--
        : (headAssetIndex.value = headAssets.value.length - 1);
      break;
    case "face":
      faceAssetIndex.value > 0
        ? faceAssetIndex.value--
        : (faceAssetIndex.value = faceAssets.value.length - 1);
      break;
    case "leftArm":
      leftArmAssetIndex.value > 0
        ? leftArmAssetIndex.value--
        : (leftArmAssetIndex.value = leftArmAssets.value.length - 1);
      break;
    case "leftHand":
      leftHandAssetIndex.value > 0
        ? leftHandAssetIndex.value--
        : (leftHandAssetIndex.value = leftHandAssets.value.length - 1);
      break;
    case "body":
      bodyAssetIndex.value > 0
        ? bodyAssetIndex.value--
        : (bodyAssetIndex.value = bodyAssets.value.length - 1);
      break;
    case "rightArm":
      rightArmAssetIndex.value > 0
        ? rightArmAssetIndex.value--
        : (rightArmAssetIndex.value = rightArmAssets.value.length - 1);
      break;
    case "rightHand":
      rightHandAssetIndex.value > 0
        ? rightHandAssetIndex.value--
        : (rightHandAssetIndex.value = rightHandAssets.value.length - 1);
      break;
    case "leftLeg":
      leftLegAssetIndex.value > 0
        ? leftLegAssetIndex.value--
        : (leftLegAssetIndex.value = leftLegAssets.value.length - 1);
      break;
    case "rightLeg":
      rightLegAssetIndex.value > 0
        ? rightLegAssetIndex.value--
        : (rightLegAssetIndex.value = rightLegAssets.value.length - 1);
      break;
  }
};

const nextAsset = (asset: string) => {
  switch (asset) {
    case "head":
      headAssets.value.length - 1 > headAssetIndex.value
        ? headAssetIndex.value++
        : (headAssetIndex.value = 0);
      break;
    case "face":
      faceAssets.value.length - 1 > faceAssetIndex.value
        ? faceAssetIndex.value++
        : (faceAssetIndex.value = 0);
      break;
    case "leftArm":
      leftArmAssets.value.length - 1 > leftArmAssetIndex.value
        ? leftArmAssetIndex.value++
        : (leftArmAssetIndex.value = 0);
      break;
    case "leftHand":
      leftHandAssets.value.length - 1 > leftHandAssetIndex.value
        ? leftHandAssetIndex.value++
        : (leftHandAssetIndex.value = 0);
      break;
    case "body":
      bodyAssets.value.length - 1 > bodyAssetIndex.value
        ? bodyAssetIndex.value++
        : (bodyAssetIndex.value = 0);
      break;
    case "rightArm":
      rightArmAssets.value.length - 1 > rightArmAssetIndex.value
        ? rightArmAssetIndex.value++
        : (rightArmAssetIndex.value = 0);
      break;
    case "rightHand":
      rightHandAssets.value.length - 1 > rightHandAssetIndex.value
        ? rightHandAssetIndex.value++
        : (rightHandAssetIndex.value = 0);
      break;
    case "leftLeg":
      leftLegAssets.value.length - 1 > leftLegAssetIndex.value
        ? leftLegAssetIndex.value++
        : (leftLegAssetIndex.value = 0);
      break;
    case "rightLeg":
      rightLegAssets.value.length - 1 > rightLegAssetIndex.value
        ? rightLegAssetIndex.value++
        : (rightLegAssetIndex.value = 0);
      break;
  }
};

const saveGlitchyNFT = () => {
  if (character.value) {
    if (name.value.match(/([^\s])/)) {
      nameError.value = false;
      toPng(character.value).then((dataUrl) => {
        store.appwrite.database
          .createDocument(
            "glitchynfts",
            "unique()",
            {
              glitchyNFTName: name.value,
              glitchyNFTBase64: dataUrl,
              ownerId: store.user.$id,
              ownerName: store.user.name,
            },
            ["role:all"],
            [`user:${store.user.$id}`]
          )
          .then(() => (saveSuccess.value = true))
          .catch(() => (window.location.hash = "#/error"));
      });
    } else {
      nameError.value = true;
    }
  }
};

const goToAccount = () => {
  window.location.hash = "#/account";
};

await Promise.all([
  headPromise(),
  facePromise(),
  leftArmPromise(),
  leftHandPromise(),
  bodyPromise(),
  rightArmPromise(),
  rightHandPromise(),
  leftLegPromise(),
  rightLegPromise(),
])
  .then(() => {
    if (!store.user) {
      window.location.hash = "#/auth";
    }
  })
  .catch(() => (window.location.hash = "#/"));
</script>

<style scoped lang="scss">
.creator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  .success {
    .title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .description {
      font-size: 1.5rem;
    }

    :deep(.button) {
      width: fit-content;
      margin: 50px auto 0 auto;
    }
  }

  .preview {
    display: flex;
    align-items: center;

    .wrapper {
      #glitchyNFT-name {
        height: 35px;
        margin-bottom: 11px;
        width: 100%;
        border: 1px solid #1e1e1e;
        border-radius: 5px;
        background: #1e1e1e;
        color: #ffffff;
        font-size: 1.2rem;
        padding: 20px 10px;
        transition: border 0.3s ease-in-out;
        outline: none;

        &.error {
          border: 1px solid #ff0000;
        }
      }
      .character-wrapper {
        height: 800px;
        width: 800px;
        background: #1e1e1e;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .character-background {
          background: v-bind(backgroundColorWrapper);
          width: 100%;
          height: 100%;
          position: absolute;
          text-align: justify;
          text-transform: uppercase;
          padding: 5px;
          font-size: 2rem;
          line-height: 2.5rem;
          font-weight: bold;
          word-break: break-all;
          overflow: hidden;
          color: v-bind(backgroundColorText);
        }
        .character {
          display: flex;
          flex-direction: column;
          align-items: center;

          .top-limb {
            position: relative;
            z-index: 3;
            .head {
              img {
                width: 480px;
                height: 480px;
              }
            }
            .face {
              position: absolute;
              top: 205px;
              left: 135px;
              img {
                width: 320px;
                height: 240px;
              }
            }
          }

          .middle-limbs {
            position: relative;
            margin-top: -125px;
            left: 5px;
            z-index: 2;

            .left-middle-limb {
              .left-arm {
                position: absolute;
                top: 90px;
                right: 0;
                z-index: -1;
                img {
                  width: 128px;
                  height: 128px;
                }
              }

              .left-hand {
                position: absolute;
                top: 142px;
                right: 0;
                z-index: -1;
                img {
                  width: 128px;
                  height: 128px;
                }
              }
            }

            .body {
              img {
                width: 320px;
                height: 320px;
              }
            }

            .right-middle-limb {
              .right-arm {
                position: absolute;
                top: 85px;
                left: 0;
                img {
                  width: 128px;
                  height: 128px;
                }
              }

              .right-hand {
                position: absolute;
                top: 152px;
                left: 0;
                img {
                  width: 128px;
                  height: 128px;
                }
              }
            }
          }

          .bottom-limbs {
            position: relative;
            width: 340px;
            margin-top: -95px;
            margin-bottom: 135px;
            z-index: 1;

            .left-leg {
              position: absolute;
              top: 0;
              right: 45px;
              img {
                width: 128px;
                height: 128px;
              }
            }

            .right-leg {
              position: absolute;
              top: 0;
              left: 45px;
              img {
                width: 128px;
                height: 128px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
