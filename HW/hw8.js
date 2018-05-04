<html>
<script>
function runSimulation(numItems,S0,SD,E0,ED,threshold,decay,noise,numSim) {
    $("#output").html("");
    var c = [],
        v = [],
        g = [],
        r = [],
        t = [],
        e = [],
        f = [],
        d, h = [];
    d = [];
    var y = [],
        u = [],
        E = 0,
        F = 0,
        w = [],
        x = [],
        z = [],
        A = [],
        B = [],
        C = [],
        D = [],
        a = numItems
        G = S0
        H = SD
        I = E0
        J = ED
        K = threshold
        L = decay
        M = noise
        b = numSim
    results = "<pre>";
    results += "Parameter Settings:\n";
    results += "numItems = " + a + "\n";
    results += "numSims =  " +
        b + "\n\n";
    results += "So = " + G + "\n";
    results += "S  = " + H + "\n";
    results += "Eo = " + I + "\n";
    results += "E  = " + J + "\n";
    results += "To = " + K + "\n";
    results += "Rs = " + L + "\n";
    results += "Gc = " + M + "\n";
    results += "\n";
    for (i = 0; i <= b; i++) recalls[i] = [];
    for (i = 0; i <= a; i++)
        for (f[i] = [], token_p1[i] = [], u[i] = [], 
            token_p1[i] = [], overlap[i] = [], cat_select[i] = [],
             z[i] = [], A[i] = [], B[i] = [], C[i] = [], D[i] = [], w[i] = [], x[i] = [], 
             j = 0; j <= a; j++) 

            w[i][j] = [], x[i][j] = [];
    for (loop = 1; loop <= b; loop++) {
        for (i = 1; i <= a; i++) y[i] = G * Math.pow(H, i - 1), d[i] = I * Math.pow(J, a - i);
        for (i = 1; i <= a; i++) token_p1[i][0] = i, token_p1[i][1] = y[i], token_p1[i][2] = d[i], token_p1[i][3] = 0;
        for (i = 1; i <= a; i++) u[i][1] = y[i], u[i][2] = d[i];
        for (i = 1; i <= a; i++)
            for (j = 1; j <= a; j++)
                for (k = 1; 2 >= k; k++) w[i][j][k] = token_p1[i][k] - u[j][k], x[i][j][k] = w[i][j][k] * w[i][j][k];
        for (l = 1; l <= a; l++)
            for (m = 1; m <= a; m++) z[l][m] = x[l][m][1] + x[l][m][2], A[l][m] = -1 * Math.pow(z[l][m], .5), B[l][m] = Math.exp(A[l][m]);
        for (n = 1; n <= a; n++)
            for (o = 1; o <= a; o++) C[n][o] = token_p1[n][1] * u[o][1] + token_p1[n][2] * u[o][2], D[n][o] = Math.pow(C[n][o], .5);
        for (p = 1; p <=
            a; p++)
            for (q = 1; q <= a; q++) overlap[p][q] = D[p][q] * B[p][q];
        var N = a * a;
        for (i = 1; i <= N; i++) noise[i] = nextGaussian();
        for (i = 1; i <= N; i++) noise[i] *= M;
        suppressionAndSelection(a, loop, K, L)
    }
    for (i = 0; i <= a; i++)
        for (c[i] = 0, v[i] = 0, g[i] = 0, r[i] = 0, t[i] = 0, e[i] = 0, j = 1; j <= a; j++) f[i][j] = 0;
    for (i = 1; i <= b; i++) {
        d = !0;
        for (k = 1; k <= a; k++) h[k] = 0;
        for (j = 1; j <= a; j++) recalls[i][j] == j ? (c[j] += 1, f[j][j]++) : (f[recalls[i][j]][j]++, d = !1), resp = recalls[i][j], e[resp]++, 0 == resp ? t[j]++ : (h[resp]++, 1 < h[resp] && (v[resp]++, g[j]++, g[0]++));
        for (k = 1; k <= a; k++) 0 == h[k] &&
            r[k]++;
        d && E++
    }
    for (i = 1; i <= a; i++) c[i] /= b;
    for (i = 1; i <= a; i++) F += c[i];
    s = E / b;
    results += "Proportion of lists recalled correctly:\t" + s.toFixed(4) + "\n\n";
    s = F / a;
    results += "Overall proportion correct:\t" + s.toFixed(4) + "\n\n";
    results += "Proportion correct at each position:\n";
    for (i = 1; i <= a; i++) s = c[i], results += s.toFixed(4) + "\t";
    results += "\n\n";
    results += "Proportion of errors at each position:\n";
    for (i = 1; i <= a; i++) s = 1 - c[i], results += s.toFixed(4) + "\t";
    results += "\n\n";
    results += "Transposition Gradients:\n";
    for (i = 1; i <= a; i++) results +=
        "\tPos " + i;
    results += "\n";
    for (i = 1; i <= a; i++) {
        results += "Item " + i + "\t";
        for (j = 1; j <= a; j++) s = f[j][i] / b, results += s.toFixed(4) + "\t";
        results += "\n"
    }
    results += "\n";
    results += "Total repetitions (% of responses):\n";
    s = 100 * g[0] / b;
    results += s.toFixed(4) + "\n\n";
    results += "Repetitions (% of responses) by Input Position:\n";
    for (i = 1; i <= a; i++) s = 100 * v[i] / b, results += s.toFixed(4) + "\t";
    results += "\n\n";
    results += "Repetitions (% of responses) by Output Position:\n";
    for (i = 1; i <= a; i++) s = 100 * g[i] / b, results += s.toFixed(4) + "\t";
    results +=
        "\n\n";
    results += "Percentage of time each item recalled:\n";
    for (i = 1; i <= a; i++) s = 100 * e[i] / b, results += s.toFixed(4) + "\t";
    results += "\n\n";
    results += "Total omissions (% of responses):\n";
    s = 100 * e[0] / b;
    results += s.toFixed(4) + "\n\n";
    results += "Omissions (% of responses) by Input Position:\n";
    for (i = 1; i <= a; i++) s = 100 * r[i] / b, results += s.toFixed(4) + "\t";
    results += "\n\n";
    results += "Omissions (% of responses) by Output Position:\n";
    for (i = 1; i <= a; i++) s = 100 * t[i] / b, results += s.toFixed(4) + "\t";
    results += "\n\n";
    results += "</pre>";
    $("#output").html(results)
}

function suppressionAndSelection(b, c, v, g) {
    var r = 0,
        t, e = [],
        f = 0,
        d = [],
        h = [];
    for (i = 1; i <= b; i++) e[i] = 0;
    for (i = 1; i <= b; i++) {
        for (j = 1; j <= b; j++) t = token_p1[j][3], r++, token_p1[j][3] *= Math.exp(-g), cat_select[j][i] = overlap[j][i] * (1 - t) + noise[r], cat_select[j][i] > e[i] && (e[i] = cat_select[j][i], d[i] = Math.floor(token_p1[j][0]), f = d[i]);
        token_p1[f][3] = 1;
        h[i] = e[i] > v ? d[i] : 0
    }
    for (i = 1; i <= b; i++) recalls[c][i] = h[i]
}

function nextGaussian() {
    var b, c;
    do b = 2 * Math.random() - 1, c = 2 * Math.random() - 1, c = b * b + c * c; while (1 <= c || 0 == c);
    return b * Math.sqrt(-2 * Math.log(c) / c)
};

</script>
</html>