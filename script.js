//// 定数
// 数牌
const manzuIds = [11, 12, 13, 14, 15, 16, 17, 18, 19];
const pinzuIds = [21, 22, 23, 24, 25, 26, 27, 28, 29];
const souzuIds = [31, 32, 33, 34, 35, 36, 37, 38, 39];
const suhaiIds = manzuIds.concat(pinzuIds).concat(souzuIds);

//三元牌
const hakuId = 41;
const hatsuId = 42;
const chunId = 43;
const sangenIds = [hakuId, hatsuId, chunId];

//風牌
const tonIds = 51;
const nanIds = 52;
const shaIds = 53;
const peiIds = 54;
const kazesIds = [tonIds, nanIds, shaIds, peiIds];

//字牌
const jihaiIds = sangenIds.concat(kazesIds);

//すべてのハイ種
const allKindOfHaiIds = suhaiIds.concat(jihaiIds);


//// 変数

// 全ハイ
let allHais = [];

// 山ハイ
let yamaHai = [];

// 手牌
let teHai = [];

// 河ハイ
let kawaHai = [];

//ハイの表示テンプレート
let yamaHaiViewTemplete;
let teHaiViewTemplete;
let kawaHaiViewTemplete;

//// 関数
// ハイの表示取得
function getHaiDisplay(kindOfHaiId) {
    switch (kindOfHaiId) {
        case manzuIds[0]:
            return "一";
            break;
        case manzuIds[1]:
            return "二";
            break;
        case manzuIds[2]:
            return "三";
            break;
        case manzuIds[3]:
            return "四";
            break;
        case manzuIds[4]:
            return "五";
            break;
        case manzuIds[5]:
            return "六";
            break;
        case manzuIds[6]:
            return "七";
            break;
        case manzuIds[7]:
            return "八";
            break;
        case manzuIds[8]:
            return "九";
            break;
        case pinzuIds[0]:
            return "①";
            break;
        case pinzuIds[1]:
            return "②";
            break;
        case pinzuIds[2]:
            return "③";
            break;
        case pinzuIds[3]:
            return "④";
            break;
        case pinzuIds[4]:
            return "⑤";
            break;
        case pinzuIds[5]:
            return "⑥";
            break;
        case pinzuIds[6]:
            return "⑦";
            break;
        case pinzuIds[7]:
            return "⑧";
            break;
        case pinzuIds[8]:
            return "⑨";
            break;
        case souzuIds[0]:
            return "１";
            break;
        case souzuIds[1]:
            return "２";
            break;
        case souzuIds[2]:
            return "３";
            break;
        case souzuIds[3]:
            return "４";
            break;
        case souzuIds[4]:
            return "５";
            break;
        case souzuIds[5]:
            return "６";
            break;
        case souzuIds[6]:
            return "７";
            break;
        case souzuIds[7]:
            return "８";
            break;
        case souzuIds[8]:
            return "９";
            break;
        case hakuId:
            return "白";
            break;
        case hatsuId:
            return "發";
            break;
        case chunId:
            return "中";
            break;
        case tonIds:
            return "東";
            break;
        case nanIds:
            return "南";
            break;
        case shaIds:
            return "西";
            break;
        case peiIds:
            return "北";
            break;
        default:
            throw Error;


    }
}

// シャッフル処理
function shuffle(a) {
    for (var i = a.length - 1; i >= 0; i--) {
        var r = Math.floor(i * Math.random());
        var tmp = a[i];
        a[i] = a[r];
        a[r] = tmp;
    }
    return a;
}

// ハイの表示更新
function updateViewOfHai(hais, place, viewTemplete) {
    place.innerHTML = "";
    hais.forEach(
        function (hai) {
            place.innerHTML += viewTemplete
                .replace(
                    '{display}',
                    place == yama
                    ? "■"
                    : getHaiDisplay(hai.kindOfHaiId)
                )
                .replace('{haiId}', hai.id);
        }
    )
}

// 手ハイのソート
function sortTeHai(teHai) {
    teHai.sort(
      function(a,b){
          return a.kindOfHaiId - b.kindOfHaiId;
      }
    );
}

// 初期表示時
window.addEventListener('DOMContentLoaded', function () {

    // HTML取得
    {
        //ハイの表示テンプレート
        yamaHaiViewTemplete = yama.innerHTML;
        {
            yama.innerHTML = "";
        }
        teHaiViewTemplete = te.innerHTML;
        {
            te.innerHTML = "";
        }
        kawaHaiViewTemplete = kawa.innerHTML;
        {
            kawa.innerHTML = "";
        }
    }

    // 全ハイ生成
    {
        //1種類につき4まいづつ生成
        allKindOfHaiIds.concat(allKindOfHaiIds).concat(allKindOfHaiIds).concat(allKindOfHaiIds)
            .forEach(
                function (kindOfHaiId) {
                    allHais.push(
                        {id: "", kindOfHaiId: kindOfHaiId}
                    );
                }
            )

        // シャッフル
        shuffle(allHais);

        // IDを振る
        allHais.forEach(
            function (hai, index) {
                hai.id = index;
            }
        )
    }

    // 山に置く
    {
        yamaHai = allHais.slice();
    }

    // 手牌を14枚取る
    {
        teHai = [];
        const numberOfTehai = 14;
        for (i = 0; i < numberOfTehai; i++) {
            teHai.push(yamaHai.shift());
        }

        sortTeHai(teHai);

        // 手牌と山ハイと河ハイの表示更新
        {
            updateViewOfHai(teHai, te, teHaiViewTemplete);
            updateViewOfHai(yamaHai, yama, yamaHaiViewTemplete);
            updateViewOfHai(kawaHai, kawa, kawaHaiViewTemplete);
        }
    }

    //todo 上がり判定


});

// 手牌選択時の処理
function teOnClick(selected){
    //選択したハイID
    let selectedHaiId = selected.getAttribute("data-haiId");


    // 手牌を削除
    teHai.some(function (hai, index) {

            if ( (Number(hai.id) === Number(selectedHaiId)) ) {

                // 手牌を削除
                teHai.splice(index, 1);

                // 河ハイを増やす
                kawaHai.push( {id:hai.id, kindOfHaiId:hai.kindOfHaiId} );
            }

        }
    );

    // 手牌のソート
    sortTeHai(teHai);

    // 手牌と河の表示更新
    {
        updateViewOfHai(teHai, te, teHaiViewTemplete);
        updateViewOfHai(kawaHai, kawa, kawaHaiViewTemplete);
    }

    //山から1ハイ取る
    {
        teHai.push(yamaHai.shift());

        // 手牌と山ハイと河ハイの表示更新
        {
            updateViewOfHai(teHai, te, teHaiViewTemplete);
            updateViewOfHai(yamaHai, yama, yamaHaiViewTemplete);
            updateViewOfHai(kawaHai, kawa, kawaHaiViewTemplete);
        }
    }


    //todo 上がり判定

}